const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Students, Treatments } = require("./startMongoose");

const app = express();
app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const studentDetails = await Students.find({ studentId: userId });
    const medicalDetails = await Treatments.find({ studentId: userId });
    res.status(200).send({ studentDetails, medicalDetails });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
