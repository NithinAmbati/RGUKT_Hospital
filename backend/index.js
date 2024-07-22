const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const connectMongoDb = require("./connection");

const MONGO_URI =
  "mongodb+srv://nithinambati2:yLbT7wHeE14Surh1@cluster0.9qpuxmc.mongodb.net/RGUKT_Hospital?retryWrites=true&w=majority";

connectMongoDb(MONGO_URI);

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
