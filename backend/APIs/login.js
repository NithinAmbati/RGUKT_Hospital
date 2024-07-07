const express = require("express");
const router = express.Router();
const { Doctor, Pharmacist, Admin } = require("./startMongoose");
const jwt = require("jsonwebtoken");

// Candidate Login API
router.post("/", async (req, res) => {
  const { userId, password } = req.body;

  try {
    let user;
    if (userId.startsWith("D"))
      user = await Doctor.findOne({ userId, password });
    else if (userId.startsWith("P"))
      user = await Pharmacist.findOne({ userId, password });
    else if (userId.startsWith("A"))
      user = await Admin.findOne({ userId, password });
    else {
      res.status(400).send("Invalid user type");
      return;
    }

    if (!user) {
      res.status(400).send("Login Failure");
      return;
    }

    // Generate JWT token
    const payload = {
      userId,
    };
    const jwtToken = jwt.sign(payload, "Nithin");
    res.status(201).send({ jwtToken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
