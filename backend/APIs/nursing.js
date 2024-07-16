const express = require("express");
const { Treatments } = require("./mongoDBConnection");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("HI Nithin");
});

router.post("/", async (req, res) => {
  const {
    studentId,
    pulseRate,
    bloodPressure,
    spo2,
    temperature,
    weight,
    ecg,
  } = req.body;
  console.log(req.body);
  const newTreatment = new Treatments({
    studentId,
    pulseRate,
    bloodPressure,
    spo2,
    temperature,
    weight,
    ecg,
    treatmentDate: new Date(),
    status: "pending",
  });
  await newTreatment.save();
  res.status(200).send("Successful");
});

router.put("/:treatmentId", async (req, res) => {
  try {
    const { spo2, ecg } = req.body;
    console.log(req.body);
    const { treatmentId } = req.params;
    await Treatments.findByIdAndUpdate(
      { _id: treatmentId },
      { $set: { spo2, ecg } },
      { new: true }
    );
    res.status(200).send("Successfully Updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
