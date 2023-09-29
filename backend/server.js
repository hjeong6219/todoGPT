const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5050;

app.use(cors());

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World!", people: ["Harry", "Jack", "Barry"] });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
