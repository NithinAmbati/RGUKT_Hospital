const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Students, Treatments } = require("./startMongoose");

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

router.post("/", async (req, res) => {
  try {
    const { studentsData } = req.body;
    await Students.insertMany(studentsData);
    res.status(200).send("File uploaded and data stored successfully!");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
