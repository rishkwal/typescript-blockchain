import express from "express";
import bodyParser from "body-parser";
import Blockchain from "./blockchain";
import { v1 } from "uuid";
import requestPromise from "request-promise";
import { Request } from "request";

const uuid = v1;
const nodeAddress = uuid().split("-").join("");
const TScoin = new Blockchain();
const app = express();

const PORT = process.argv[2];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/blockchain", (req, res) => {
  res.send(TScoin);
});

app.post("/transaction", (req, res) => {
  const newTransaction = req.body;
  const blockIndex =
    TScoin.addTransactionsToPendingTransactions(newTransaction);
  res.json({ note: `Transaction will be added in block ${blockIndex}` });
});

app.post("/transaction/broadcast", (req, res) => {
  const newTransaction = TScoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );
  TScoin.addTransactionsToPendingTransactions(newTransaction);
  const requestPromises: Request[] = [];
  TScoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + "/transaction",
      method: "POST",
      body: newTransaction,
      json: true,
    };
    requestPromises.push(requestPromise(requestOptions));
  });
  Promise.all(requestPromises).then((data) => {
    res.json({ note: "Transaction created and broadcast successfully" });
  });
});

app.get("/mine", (req, res) => {
  const lastBlock = TScoin.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = TScoin.pendingTransactions;
  const nonce = TScoin.proofOfWork(previousBlockHash, currentBlockData);
  const hash = TScoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  const newBlock = TScoin.createNewBlock(nonce, previousBlockHash, hash);

  const requestPromises: Request[] = [];
  TScoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + "/receive-new-block",
      method: "POST",
      body: { newBlock: newBlock },
      json: true,
    };

    requestPromises.push(requestPromise(requestOptions));
  });

  Promise.all(requestPromises)
    .then((data) => {
      const requestOptions = {
        uri: TScoin.currentNodeUrl + "/transaction/broadcast",
        method: "POST",
        body: {
          amount: 12.5,
          sender: "00",
          recipient: nodeAddress,
        },
        json: true,
      };
      return requestPromise(requestOptions);
    })
    .then((data) => {
      res.json({
        note: "New block mined successfully",
        block: newBlock,
      });
    });
});

app.post("/receive-new-block", (req, res) => {
  const newBlock = req.body.newBlock;
  const lastBlock = TScoin.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock["index"] + 1 === newBlock["index"];

  if (correctHash && correctIndex) {
    TScoin.chain.push(newBlock);
    TScoin.pendingTransactions = [];
    res.json({
      note: "New block received and accepted",
      newBlock: newBlock,
    });
  } else {
    res.json({ note: "New Block Rejected", newBlock: newBlock });
  }
});

app.post("/register-and-broadcast-node", (req, res) => {
  const newNodeUrl: string = req.body.newNodeUrl;
  if (TScoin.networkNodes.indexOf(newNodeUrl) == -1)
    TScoin.networkNodes.push(newNodeUrl);

  var regNodesPromises: Request[] = [];
  TScoin.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      uri: networkNodeUrl + "/register-node",
      method: "POST",
      body: { newNodeUrl: newNodeUrl },
      json: true,
    };

    regNodesPromises.push(requestPromise(requestOptions));
  });
  Promise.all(regNodesPromises)
    .then((data) => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + "/register-nodes-bulk",
        method: "POST",
        body: {
          allNetworkNodes: [...TScoin.networkNodes, TScoin.currentNodeUrl],
        },
        json: true,
      };

      return requestPromise(bulkRegisterOptions);
    })
    .then((data) => {
      res.json({ note: "New node registered with network sucessfully" });
    });
});

app.post("/register-node", (req, res) => {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = TScoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = TScoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode)
    TScoin.networkNodes.push(newNodeUrl);
  res.json({ note: `Node url:'${newNodeUrl}' successfully registered.` });
});

app.post("/register-nodes-bulk", (req, res) => {
  const allNetworkNodes: string[] = req.body.allNetworkNodes;
  allNetworkNodes.forEach((networkNodeUrl) => {
    const nodeNotAlreadyPresent =
      TScoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = TScoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode)
      TScoin.networkNodes.push(networkNodeUrl);
  });
  res.json({ note: "Bulk nodes registered" });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
