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
  const blockIndex = TScoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );
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

  TScoin.createNewTransaction(12.5, "00", nodeAddress);

  const newBlock = TScoin.createNewBlock(nonce, previousBlockHash, hash);
  res.json({
    note: "New block mined successfully",
    block: newBlock,
  });
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
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
