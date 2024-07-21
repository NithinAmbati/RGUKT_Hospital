const express = require("express");
const router = express.Router();
const { Doctor, Pharmacist, Nurse } = require("../models");
const { hashPassword } = require("../controllers/passwordHashing");
const { ExistingUserIds } = require("../models");

router.post("/", async (req, res) => {
  const { userId, username, password, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    if (role === "doctor") {
      const newUser = new Doctor({
        userId: "D" + userId,
        username,
        password: hashedPassword,
      });
      await newUser.save();
    } else if (role === "pharmacist") {
      const newUser = new Pharmacist({
        userId: "P" + userId,
        username,
        password: hashedPassword,
      });
      await newUser.save();
    } else if (role === "nurse") {
      const newUser = new Nurse({
        userId: "N" + userId,
        username,
        password: hashedPassword,
      });
      await newUser.save();
    }

    const existingUserId = await ExistingUserIds.findOne({ role });

    if (existingUserId) {
      await ExistingUserIds.updateOne({ role }, { $set: { userId } });
    } else {
      const newExistingUserId = new ExistingUserIds({
        userId,
        role,
      });
      await newExistingUserId.save();
    }
    res.status(200).send("Registration Successful");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
