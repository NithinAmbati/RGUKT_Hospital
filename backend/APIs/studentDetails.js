const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Students, Treatments } = require("./startMongoose");

router.get("/", async (req, res) => {
  try {
    const { studentId } = req.query;

    const studentInfo = await Students.findOne({
      studentId: { $regex: studentId, $options: "i" },
    });

    const medicalInfo = await Treatments.find({
      studentId: { $regex: studentId, $options: "i" },
    });
    res.status(200).send({ studentInfo, medicalInfo });
  } catch (error) {
    console.error("Error:", error);
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
