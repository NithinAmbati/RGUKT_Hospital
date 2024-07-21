const express = require("express");
const router = express.Router();
const { Students } = require("../models");
const verifyToken = require("../Middleware/VerifyToken");

// Student-Details API
router.get("/", verifyToken, async (req, res) => {
  try {
    const { studentId } = req.query;
    const studentInfo = await Students.findOne({
      studentId: { $eq: studentId },
    });
    if (!studentInfo) {
      return res.status(404).send("Student not found!");
    }
    res.status(200).send(studentInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Student-Upload API
router.post("/", verifyToken, async (req, res) => {
  try {
    const { studentsData } = req.body;
    await Students.insertMany(studentsData);
    res.status(200).send("File uploaded and data stored successfully!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
