const express = require("express");
const { Treatments } = require("../models");
const router = express.Router();

router.use("/", async (req, res) => {
  try {
    const data = await Treatments.aggregate([
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
      {
        $lookup: {
          from: "treatments",
          pipeline: [
            {
              $group: {
                _id: "$reason",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                reason: "$_id",
              },
            },
          ],
          as: "reasons",
        },
      },
      {
        $project: {
          _id: 0,
          ipCount: 1,
          opCount: 1,
          reasons: "$reasons.reason",
        },
      },
    ]);

    res.status(200).send(data[0]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
