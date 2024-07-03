const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Appointments } = require("./startMongoose");

const app = express();
app.use(express.json());

router.get("/patient/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Appointments.find({ userId });
    res.status(200).send(history);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
