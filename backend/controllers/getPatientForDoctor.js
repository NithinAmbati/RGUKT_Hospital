const { Treatments } = require("../models");

const getPatientForDoctors = async (req, res) => {
  try {
    const { status, studentId } = req.query;
    console.log(studentId);
    const treatments = await Treatments.find({ status, studentId }).sort({
      treatmentDate: -1,
    });
    res.status(200).json(treatments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = getPatientForDoctors;
