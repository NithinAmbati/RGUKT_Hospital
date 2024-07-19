const { Pharmacist, Doctor, Admin, Nurse } = require("../models");
const { hashPassword, verifyPassword } = require("./passwordHashing");

const changePassword = (Model) => async (req, res) => {
  try {
    const { userId } = req;
    const { oldPassword, newPassword } = req.body;
    const user = await Model.findOne({ userId });

    // Verify the old password
    const isMatch = await verifyPassword(oldPassword, user.password);
    if (!isMatch) return res.status(401).send("Incorrect Password");

    // Hash the new password and update it in the database
    const hashedPassword = await hashPassword(newPassword);
    const data = await Model.updateOne(
      { userId },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const changePharmacistPassword = changePassword(Pharmacist);
const changeDoctorPassword = changePassword(Doctor);
const changeAdminPassword = changePassword(Admin);
const changeNursePassword = changePassword(Nurse);

module.exports = {
  changePharmacistPassword,
  changeDoctorPassword,
  changeAdminPassword,
  changeNursePassword,
};
