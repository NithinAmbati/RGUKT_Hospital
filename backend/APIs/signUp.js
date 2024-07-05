const express = require("express");
const router = express.Router();
const { Student, Doctor, Pharmacist } = require("./startMongoose");

router.post("/", async (req, res) => {
  const { userId, name, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser;
    if (userId.startsWith("B"))
      existingUser = await Student.findOne({ userId, password });
    else if (userId.startsWith("D"))
      existingUser = await Doctor.findOne({ userId, password });
    else if (userId.startsWith("P"))
      existingUser = await Pharmacist.findOne({ userId, password });

    console.log(existingUser);

    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }
    // Create new user
    if (userId.startsWith("B")) {
      const newUser = new Student({ userId, name, email, password });
      await newUser.save();
    } else if (userId.startsWith("D")) {
      const newUser = new Doctor({ userId, name, email, password });
      await newUser.save();
    } else if (userId.startsWith("P")) {
      const newUser = new Pharmacist({ userId, name, email, password });
      await newUser.save();
    }
    res.status(200).send("Registration Successful");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
