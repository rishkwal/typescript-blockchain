import express from "express";
import bodyParser from "body-parser";
import Blockchain from "./blockchain";
import { v1 } from "uuid";
import re from 'request-promise';

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

app.post('/register-and-broadcast-node', (req,res) => {
  const newNodeUrl:string = req.body.newNodeUrl;
  if(TScoin.networkNodes.indexOf(newNodeUrl) == -1)
    TScoin.networkNodes.push(newNodeUrl);
  
  TScoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
        uri: networkNodeUrl + '/register-node',
        method: 'POST',
        body: {newNodeUrl: newNodeUrl},
        json: true
      };
  })
})

app.post('register-node', (req,res)=>{

})

app.post('/register-nodes-bulk',(req,res)=>{
  
})

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
