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
    console.error("Error:", error);
    const errorMessage = await response.text();
    console.log(errorMessage);
  }
};

module.exports = treatmentUpdateByDoctor;
