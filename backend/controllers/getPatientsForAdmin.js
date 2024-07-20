const { Treatments } = require("../models");

const getPatientsForAdmin = async (req, res) => {
  try {
    const { date } = req.query;

    // const treatments = await Treatments.aggregate([
    //   {
    //     $match: { treatmentDate: new Date(date) },
    //   },
    //   {
    //     $sort: { treatmentDate: 1 },
    //   },
    //   {
    //     $skip: parseInt(start) * 10 + 1,
    //   },
    //   {
    //     $limit: 10,
    //   },
    // ]);

    //const treatments = await Treatments.find({ treatmentDate: new Date(date) });
    const treatments = await Treatments.find();

    res.status(200).send(treatments);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
};

module.exports = getPatientsForAdmin;
