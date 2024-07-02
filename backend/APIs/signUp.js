const express = require("express");
const router = express.Router();
const { Student, Doctor, Pharmacist } = require("./startMongoose");

router.post("/student", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(username);

  try {
    // Check if user already exists
    const existingUser = await Student.findOne({ username, email });
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }
    // Create new user
    const newUser = new Student({ username, password, email });
    await newUser.save();

    res.status(200).send("Registration Successful");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/doctor", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Doctor.findOne({ username, email });
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    // Create new user
    const newUser = new Doctor({ username, password, email });
    await newUser.save();

    res.status(200).send("Registration Successful");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/pharmacist", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Pharmacist.findOne({ username, email });
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    // Create new user
    const newUser = new Pharmacist({ username, password, email });
    await newUser.save();

    res.status(200).send("Registration Successful");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
