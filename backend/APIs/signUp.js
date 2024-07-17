const express = require("express");
const router = express.Router();
const { Doctor, Pharmacist, Nurse } = require("./startMongoose");

router.post("/", async (req, res) => {
  const { userId, username, email, password } = req.body;
  console.log(req.body);

  try {
    // Check if user already exists
    let existingUser;
    if (userId.startsWith("D")) existingUser = await Doctor.findOne({ userId });
    else if (userId.startsWith("P"))
      existingUser = await Pharmacist.findOne({ userId });
    else if (userId.startsWith("N"))
      existingUser = await Nurse.findOne({ userId });
    else {
      res.status(400).send("Invalid user type");
      return;
    }

    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    console.log(existingUser);
    // Create new user
    if (userId.startsWith("D")) {
      const newUser = new Doctor({ userId, username, email, password });
      await newUser.save();
    } else if (userId.startsWith("P")) {
      const newUser = new Pharmacist({ userId, username, email, password });
      await newUser.save();
    }
    res.status(200).send("Registration Successful");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
