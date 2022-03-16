import express from "express";
import bodyParser from "body-parser";
const app = express();

const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});

app.get("/blockchain", (req, res) => {
  res.send("This will give us the Blockchain");
});

app.post("/transaction", (req, res) => {
  console.log(req.body.test);
  res.send("This will return the transaction details");
});

app.get("/mine", (req, res) => {
  res.send("This will mine a block for us");
});
