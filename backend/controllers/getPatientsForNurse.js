const { Treatments } = require("../models");

const getPatientsForNurse = async (req, res) => {
  try {
    const { studentId } = req.query;
    if (studentId) {
      // Problematic part
      const treatments = await Treatments.find({
        studentId,
        $or: [{ status: "pending" }, { status: "issueMedicine" }],
      });

      console.log(treatments);
      res.status(200).send(treatments);
    } else {
      // Corrected part
      const treatments = await Treatments.find({
        $or: [{ status: "pending" }, { status: "issueMedicine" }],
      });
      console.log(treatments);
      res.status(200).send(treatments);
    }
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).send("Internal Server Error");
  }
};

module.exports = getPatientsForNurse;
