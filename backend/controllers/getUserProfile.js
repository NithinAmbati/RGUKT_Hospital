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

const getPharmacistData = getUserData(Pharmacist);
const getDoctorData = getUserData(Doctor);
const getAdminData = getUserData(Admin);
const getNurseData = getUserData(Nurse);

module.exports = {
  getPharmacistData,
  getDoctorData,
  getAdminData,
  getNurseData,
};
