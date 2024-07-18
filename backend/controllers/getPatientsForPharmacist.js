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
    console.error(error.message); // Log the actual error for debugging
    res.status(500).send(error.message);
  }
};

module.exports = getPatientsForPharmacist;
