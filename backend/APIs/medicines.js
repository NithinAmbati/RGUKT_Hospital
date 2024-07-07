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

router.post("/", async (req, res) => {
  try {
    const { newMedicines } = req.body;
    await Medicines.insertMany(newMedicines);
    res.status(200).send("Succesful");
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

module.exports = router;
