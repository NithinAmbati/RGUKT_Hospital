const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Treatments, Medicines } = require("./startMongoose");
const verifyToken = require("../Middleware/VerifyToken");

// Treatment POST API
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const {
      studentId,
      reason,
      treatmentDate,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
    } = req.body;

    const newTreatment = new Treatments({
      studentId,
      reason,
      treatmentDate,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      nursingStationBy: userId,
      status: "pending",
    });

    await newTreatment.save();
    res.status(201).send("Appointment successful");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

router.put("/doctor-update/:treatmentId", async (req, res) => {
  // const authorization = req.headers["authorization"];
  // if (!authorization) {
  //   return res.status(400).send("Authorization Error");
  // }
  // const jwtToken = authorization.split(" ")[1];
  // if (!jwtToken) return res.status(400).send("Authentication Error");
  // const payload = jwt.verify(jwtToken, "Nithin");
  // const { userId } = payload;
  try {
    //console.log(req.body);
    const {
      reason,
      description,
      labTest,
      drugallergy,
      advice,
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
          medicinesWritten,
        },
      }
    );
    res.status(200).send("Updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/nursing-update/:treatmentId", async (req, res) => {
  try {
    const { spo2, ecg } = req.body;
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
// Treatment update by medicines given by Pharmacist
router.put("/pharmacist-update/:treatmentId", async (req, res) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }
  const jwtToken = authorization.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authentication Error");

  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    const { userId } = payload;
    const { medicinesGiven } = req.body;

    // Find the medicines and log the output
    const data = await Medicines.find();
    if (data.length === 0) {
      return res.status(404).send("Medicines not found");
    }

    const { medicines } = data[0];

    for (const medGiven of medicinesGiven) {
      const medItem = medicines.find((item) => item.name === medGiven.name);
      if (medItem) {
        medItem.quantity -= medGiven.medicineQuantity;
      }
    }

    await Medicines.findByIdAndUpdate(data[0]._id, { $set: { medicines } });

    await Appointments.findByIdAndUpdate(appointmentId, {
      $set: {
        medicinesGiven,
        medicineIssuedBy: userId,
        status: "treated",
      },
    });

    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//get Treatments from Database
router.get("/", async (req, res) => {
  try {
    const treatments = await Treatments.find({ status: req.query.status });
    res.status(200).send(treatments);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
