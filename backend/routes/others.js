const express = require("express");
const { Others } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Others.find({ status: "PENDING" });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, reason, treatmentDate, medicinesWritten } = req.body;
    const newPatient = new Others({
      name,
      reason,
      treatmentDate,
      medicinesWritten,
      status: "PENDING",
    });

    await newPatient.save();
    res.status(201).json("Treatment Saved Succesfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:treatmentId", async (req, res) => {
  try {
    const { treatmentId } = req.params;
    const patient = await Others.findByIdAndUpdate(
      treatmentId,
      { status: "TREATED" },
      { new: true }
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json("Treated Sucessfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
