const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Appointments } = require("./startMongoose");

router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const appointments = await Appointments.find({ status });
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }

  const jwtToken = authorization.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authentication Error");

  try {
    const payload = await jwt.verify(jwtToken, "Nithin");
    const { userId } = payload;
    const { reason, appointmentDate, description, sufferingFrom } = req.body;
    const newAppointment = new Appointments({
      userId,
      appointmentDate,
      reason,
      description,
      sufferingFrom,
      status: "pending",
    });

    await newAppointment.save();
    res.status(201).send("Appointment successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:appointmentId/doctor", async (req, res) => {
  const { appointmentId } = req.params;
  console.log(req.body);
  const {
    temperature,
    bloodPressure,
    pulseRate,
    weight,
    height,
    medicines,
    noOfDaysOfMedicines,
    reviewAfter,
  } = req.body;

  try {
    await Appointments.findByIdAndUpdate(appointmentId, {
      $set: {
        temperature,
        bloodPressure,
        pulseRate,
        weight,
        height,
        medicinesWritten: medicines,
        noOfDaysOfMedicines,
        reviewAfter,
        status: "giveMedicine",
      },
    });

    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:appointmentId/pharmacist", async (req, res) => {
  const { appointmentId } = req.params;
  const { medicinesGiven } = req.body;
  try {
    await Appointments.findByIdAndUpdate(appointmentId, {
      $set: {
        medicinesGiven,
        status: "treated",
      },
    });
    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:appointmentId", async (req, res) => {
  try {
    const appointment = await Appointments.findById(req.params.appointmentId);
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
