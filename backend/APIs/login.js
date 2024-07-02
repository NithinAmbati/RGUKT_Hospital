const express = require("express");
const router = express.Router();
const { Student, Doctor, Pharmacist } = require("./startMongoose");
const jwt = require("jsonwebtoken");

// Candidate Login API
router.post("/student", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and password
    const user = await Student.findOne({ email, password });
    if (!user) {
      res.status(400).send("Login Failure");
      return;
    }

    // Generate JWT token
    const payload = {
      email: email,
    };
    const jwtToken = jwt.sign(payload, "Nithin");
    res.status(201).send({ jwtToken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Employer Login API
router.post("/doctor", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by username and password
    const user = await Doctor.findOne({ email, password });
    if (!user) {
      res.status(400).send("Login Failure");
      return;
    }

    // Generate JWT token
    const payload = {
      email: email,
    };
    const jwtToken = jwt.sign(payload, "Nithin");
    res.status(201).send({ jwtToken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/pharmacist", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by username and password
    const user = await Pharmacist.findOne({ email, password });
    if (!user) {
      res.status(400).send("Login Failure");
      return;
    }

    // Generate JWT token
    const payload = {
      email: email,
    };
    const jwtToken = jwt.sign(payload, "Nithin");
    res.status(201).send({ jwtToken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
