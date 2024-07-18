const { Treatments } = require("../models");

const getPatientForDoctors = async (req, res) => {
  try {
    const { status, studentId } = req.query;
    const treatments = await Treatments.find({ status, studentId });
    res.status(200).send(treatments);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = getPatientForDoctors;
