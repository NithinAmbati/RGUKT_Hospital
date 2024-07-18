const { Treatments } = require("../models");

const getPatientsForNurse = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      const treatments = await Treatments.find({
        studentId,
        $or: [{ status: "pending" }, { status: "issueMedicine" }],
      });
      res.status(200).send(treatments);
    } else {
      // Corrected part
      const treatments = await Treatments.find({
        $or: [{ status: "pending" }, { status: "issueMedicine" }],
      });
      res.status(200).send(treatments);
    }
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = await response.text();
    console.log(errorMessage);
  }
};

module.exports = getPatientsForNurse;
