import express from "express";
const app = express();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API server is working");
});
