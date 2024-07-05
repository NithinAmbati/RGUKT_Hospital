const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Medicines } = require("./mongoDBConnection");

router.get("/", async (req, res) => {
  try {
    const data = await Medicines.find();
    res.send(data);
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

router.put("/", async (req, res) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }
  const jwtToken = authorization.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authentication Error");
  try {
    const { newMedicines } = req.body;
    const data = await Medicines.find();
    const { medicines } = data[0];

    for (const medGiven of newMedicines) {
      const medItem = medicines.find((item) => item.name === medGiven.name);
      if (medItem) {
        medItem.quantity += medGiven.medicineQuantity;
      } else {
        medicines.push(medGiven);
      }
    }

    await Medicines.findByIdAndUpdate(data[0]._id, {
      $set: { medicines },
    });

    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
