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

router.get("/patient", async (req, res) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      res.status(401).send("Unauthorized");
      return;
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    const payload = await jwt.verify(token, "Nithin");
    const { userId } = payload;
    const appointments = await Appointments.find({ userId });
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
