const express = require("express");
const router = express.Router();
const { Students } = require("../models");
const verifyToken = require("../Middleware/VerifyToken");

// Student-Details API
router.get("/", verifyToken, async (req, res) => {
  try {
    const { studentId } = req.query;
    console.log(studentId);
    const studentInfo = await Students.find({
      studentId: { $regex: studentId, $options: "i" },
    });
    res.status(200).send(studentInfo);
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = await response.text();
    console.log(errorMessage);
  }
});

// Student-Upload API
router.post("/", verifyToken, async (req, res) => {
  try {
    const { studentsData } = req.body;
    await Students.insertMany(studentsData);
    res.status(200).send("File uploaded and data stored successfully!");
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = await response.text();
    console.log(errorMessage);
  }
});

module.exports = router;
