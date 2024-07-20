const { Doctor, Admin, Nurse, Pharmacist } = require("../models");

const getUserDetails = (Model) => async (req, res) => {
  try {
    const userDetails = await Model.find();
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const getDoctorDetails = getUserDetails(Doctor);
const getAdminDetails = getUserDetails(Admin);
const getNurseDetails = getUserDetails(Nurse);
const getPharmacistDetails = getUserDetails(Pharmacist);

module.exports = {
  getDoctorDetails,
  getAdminDetails,
  getNurseDetails,
  getPharmacistDetails,
};
