const { Treatments } = require("../models");

const getPatientsForAdmin = async (req, res) => {
  try {
    const { date } = req.query;
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      // Invalid date
      return res.status(400).send("Invalid date format");
    }

    // Normalize the date to match exactly
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    // Adjust the query to filter treatments by the given date
    const treatments = await Treatments.find({
      treatmentDate: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (treatments.length === 0) {
      return res.status(404).send("No treatments found for the given date");
    }

    res.status(200).send(treatments);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
};

module.exports = getPatientsForAdmin;
