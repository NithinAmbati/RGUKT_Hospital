const { Treatments } = require("../models");

const treatmentUpdateByNurse = async (req, res) => {
  try {
    const { spo2, ecg } = req.body;
    const { treatmentId } = req.params;
    await Treatments.findByIdAndUpdate(
      { _id: treatmentId },
      { $set: { spo2, ecg } },
      { new: true }
    );
    res.status(200).send("Successfully Updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = treatmentUpdateByNurse;
