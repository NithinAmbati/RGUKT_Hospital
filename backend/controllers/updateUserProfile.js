const { Pharmacist, Doctor, Admin, Nurse } = require("../models");

const getUserData = (Model) => async (req, res) => {
  try {
    const { userId } = req;
    const { name, email, contactNumber, profileImageUrl } = req.body;
    const data = await Model.updateOne(
      { userId },
      {
        $set: {
          name,
          email,
          contactNumber,
          profileImageUrl,
        },
      }
    );
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const updatePharmacistProfile = getUserData(Pharmacist);
const updateDoctorProfile = getUserData(Doctor);
const updateAdminProfile = getUserData(Admin);
const updateNurseProfile = getUserData(Nurse);

module.exports = {
  updatePharmacistProfile,
  updateDoctorProfile,
  updateAdminProfile,
  updateNurseProfile,
};
