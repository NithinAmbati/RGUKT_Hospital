const express = require("express");
const { Treatments } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).send("Date query parameter is required");
    }

    const treatmentDate = new Date(date);
    treatmentDate.setUTCHours(0, 0, 0, 0);

    const startDate = new Date(treatmentDate);
    const endDate = new Date(treatmentDate);
    endDate.setUTCHours(23, 59, 59, 999);

    const data = await Treatments.aggregate([
      // Filter documents by treatmentDate
      {
        $match: {
          treatmentDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $facet: {
          // Facet for counting OP and IP patients
          patientTypeCounts: [
            {
              $group: {
                _id: "$patientType",
                count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: null,
                ipCount: {
                  $sum: {
                    $cond: [{ $eq: ["$_id", "IP"] }, "$count", 0],
                  },
                },
                opCount: {
                  $sum: {
                    $cond: [{ $eq: ["$_id", "OP"] }, "$count", 0],
                  },
                },
              },
            },
          ],
          // Facet for counting reasons
          reasonCounts: [
            {
              $group: {
                _id: "$reason",
                count: { $sum: 1 },
              },
            },
            {
              $sort: { count: -1 },
            },
            {
              $limit: 5, // Limit to the top 5 reasons
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          patientTypeCounts: {
            $arrayElemAt: ["$patientTypeCounts", 0],
          },
          reasonCounts: "$reasonCounts",
        },
      },
    ]);

    console.log(data[0]);
    res.status(200).send(data[0]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
