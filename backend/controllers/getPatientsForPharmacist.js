const { Treatments } = require("../models");

const getPatientsForPharmacist = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      const treatments = await Treatments.find({
        studentId,
        status: "issueMedicine",
      });
      res.status(200).send(treatments);
    } else {
      // Corrected part
      const treatments = await Treatments.find({
        status: "issueMedicine",
      });
      res.status(200).send(treatments);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = getPatientsForPharmacist;
