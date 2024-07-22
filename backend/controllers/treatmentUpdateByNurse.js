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
    res.status(200).json("Updated Successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = treatmentUpdateByNurse;
