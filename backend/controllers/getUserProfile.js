const { Pharmacist, Doctor, Admin, Nurse } = require("../models");

const getUserData = (Model) => async (req, res) => {
  try {
    const { userId } = req;
    const data = await Model.findOne({ userId });
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const getPharmacistProfile = getUserData(Pharmacist);
const getDoctorProfile = getUserData(Doctor);
const getAdminProfile = getUserData(Admin);
const getNurseProfile = getUserData(Nurse);

module.exports = {
  getPharmacistProfile,
  getDoctorProfile,
  getAdminProfile,
  getNurseProfile,
};
