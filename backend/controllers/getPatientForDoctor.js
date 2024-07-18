const { Treatments } = require("../models");

const getPatientForDoctors = async (req, res) => {
  try {
    const { status, studentId } = req.query;
    const treatments = await Treatments.find({ status, studentId });
    res.status(200).send(treatments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = getPatientForDoctors;
