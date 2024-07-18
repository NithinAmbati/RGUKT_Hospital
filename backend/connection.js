const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/RGUKT_Hospital";
//"mongodb+srv://nithinambati2:yLbT7wHeE14Surh1@cluster0.9qpuxmc.mongodb.net/RGUKT_Hospital?retryWrites=true&w=majority";

const connectMongoDb = async (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Connected"))
    .catch((err) => console.log("Error: " + err));
};

module.exports = connectMongoDb;
