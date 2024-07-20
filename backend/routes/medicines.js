const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/VerifyToken");
const {
  getAvailableMedicines,
  addMedicineStock,
  updateMedicineQuantity,
  deleteMedicines,
} = require("../controllers/medicines");
const getMedicinesForAdmin = require("../controllers/getMedicinesForAdmin");

// Medicines API  (gives you the array  of available medicines)
router.get("/", verifyToken, getAvailableMedicines);

// Adding New Medicine stock to the Database
router.post("/", verifyToken, addMedicineStock);

// Reducing medicines from the Database when issued to patients
router.put("/", verifyToken, updateMedicineQuantity);

// Getting Medicines for Admin to view all medicines in the Database
router.get("/admin", verifyToken, getMedicinesForAdmin);

//Deleting Medicines which have quantity of 0
deleteMedicines();

module.exports = router;
