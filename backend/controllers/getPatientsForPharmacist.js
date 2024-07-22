const { Treatments } = require("../models");

const getPatientsForPharmacist = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      const treatments = await Treatments.find({
        studentId,
        status: "issueMedicine",
      });
      res.status(200).json(treatments);
    } else {
      const treatments = await Treatments.find({
        status: "issueMedicine",
      });
      res.status(200).json(treatments);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = getPatientsForPharmacist;
