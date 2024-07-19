const express = require("express");
const router = express.Router();
const { Doctor, Pharmacist, Admin, Nurse } = require("../models");
const generateJwtToken = require("../controllers/generateJwtToken");

// Candidate Login API
router.post("/", async (req, res) => {
  const { userId, password } = req.body;

  try {
    let user, role;
    if (userId.startsWith("D")) {
      user = await Doctor.findOne({ userId, password });
      role = "doctor";
    } else if (userId.startsWith("P")) {
      user = await Pharmacist.findOne({ userId, password });
      role = "pharmacist";
    } else if (userId.startsWith("A")) {
      user = await Admin.findOne({ userId, password });
      role = "admin";
    } else if (userId.startsWith("N")) {
      user = await Nurse.findOne({ userId, password });
      role = "nurse";
    } else {
      res.status(400).send("Invalid user type");
      return;
    }

    if (!user) {
      res.status(400).send("Login Failure");
      return;
    }

    // Generate JWT token
    const jwtToken = generateJwtToken(userId, role);
    res.status(201).send({ jwtToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
