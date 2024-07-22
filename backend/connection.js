const mongoose = require("mongoose");

//"mongodb://localhost:27017/RGUKT_Hospital";

const connectMongoDb = async (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Connected"))
    .catch((err) => console.log("Error: " + err));
};

module.exports = connectMongoDb;
