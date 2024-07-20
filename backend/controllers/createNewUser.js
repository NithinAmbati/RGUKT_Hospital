const { Pharmacist, Doctor, Nurse, Admin } = require("../models");

const createNewUser = async (req, res) => {
  const newUser = new Pharmacist({
    userId,
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
};

module.exports = createNewUser;
