const express = require("express");
const app = express();
app.use(express.static("client/build"));

const path = require("path");
app.get("*", (req, res) => {
  // const path3 = path.resolve(__dirname, "client", "build", "index.html");
  // console.log(path3);

  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

module.exports = app;
