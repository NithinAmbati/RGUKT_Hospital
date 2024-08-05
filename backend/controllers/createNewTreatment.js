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
      spo2,
      ecg,
    } = req.body;

    const newTreatment = new Treatments({
      studentId,
      reason,
      treatmentDate,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      spo2,
      ecg,
      nursingStationBy: userId,
      patientType: "OP",
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
