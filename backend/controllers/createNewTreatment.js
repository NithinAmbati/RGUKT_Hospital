const { Treatments } = require("../models");

const createNewTreatment = async (req, res) => {
  try {
    const { userId } = req;
    const {
      studentId,
      reason,
      treatmentDate,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
    } = req.body;

    const newTreatment = new Treatments({
      studentId,
      reason,
      treatmentDate,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      nursingStationBy: userId,
      status: "PENDING",
    });

    await newTreatment.save();
    res.status(201).json("Appointment successful");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = createNewTreatment;
