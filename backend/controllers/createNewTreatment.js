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
      status: "pending",
    });

    await newTreatment.save();
    res.status(201).send("Appointment successful");
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = await response.text();
    console.log(errorMessage);
  }
};

module.exports = createNewTreatment;
