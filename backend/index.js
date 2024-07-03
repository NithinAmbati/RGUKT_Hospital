const express = require("express");
const cors = require("cors");
const routes = require("./APIs");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

const startServer = () => {
  app.listen(8000, () => {
    console.log("server listening on 8000...");
  });
};

startServer();
