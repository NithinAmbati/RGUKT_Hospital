const { Treatments } = require("../models");

const getPatientsForNurse = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      const treatments = await Treatments.find({
        studentId,
        $or: [{ status: "pending" }, { status: "issueMedicine" }],
      });
      res.status(200).json(treatments);
    } else {
      // Corrected part
      const treatments = await Treatments.find({
        $or: [{ status: "pending" }, { status: "issueMedicine" }],
      });
      res.status(200).send(treatments);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = getPatientsForNurse;
