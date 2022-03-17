import express from "express";
import bodyParser from "body-parser";
import Blockchain from "./blockchain";

const TScoin = new Blockchain();
const app = express();

const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});

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
  res.send("This will mine a block for us");
});
