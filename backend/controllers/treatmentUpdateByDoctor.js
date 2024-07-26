const { Treatments } = require("../models");

const treatmentUpdateByDoctor = async (req, res) => {
  try {
    const { user } = req;
    const {
      reason,
      description,
      labTest,
      drugallergy,
      advice,
      hopi,
      medicinesWritten,
    } = req.body;
    const { treatmentId } = req.params;
    await Treatments.findByIdAndUpdate(
      { _id: treatmentId },
      {
        $set: {
          reason,
          description,
          labTest,
          drugallergy,
          advice,
          hopi,
          medicinesWritten,
          treatedBy: user,
          status: "ISSUE_MEDICINE",
        },
      }
    );
    res.status(200).json("Updated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = treatmentUpdateByDoctor;
