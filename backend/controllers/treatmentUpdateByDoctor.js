const { Treatments } = require("../models");

const treatmentUpdateByDoctor = async (req, res) => {
  try {
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
          status: "IssueMedicine",
        },
      }
    );
    res.status(200).send("Updated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

module.exports = treatmentUpdateByDoctor;
