const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Appointments } = require("./startMongoose");

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointments.find();
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

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointments.findById(req.params.id);
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
