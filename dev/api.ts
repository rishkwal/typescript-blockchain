import express from "express";
const app = express();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});

app.get("/blockchain", (req, res) => {
  res.send("This will give us the Blockchain");
});

app.post("/transaction", (req, res) => {
  res.send("This will return the transaction details");
});

app.get("/mine", (req, res) => {
  res.send("This will mine a block for us");
});
