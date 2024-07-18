const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/VerifyToken");
const createNewTreatment = require("../controllers/createNewTreatment");
const treatmentUpdateByDoctor = require("../controllers/treatmentUpdateByDoctor");
const treatmentUpdateByNurse = require("../controllers/treatmentUpdateByNurse");
const treatmentUpdateByPharmacist = require("../controllers/treatmentUpdateByPharmacist");
const getPatientForDoctors = require("../controllers/getPatientForDoctor");
const getPatientsForNurse = require("../controllers/getPatientsForNurse");

router.post("/", verifyToken, createNewTreatment);

router.put("/doctor-update/:treatmentId", verifyToken, treatmentUpdateByDoctor);

router.put("/nursing-update/:treatmentId", verifyToken, treatmentUpdateByNurse);

router.put(
  "/pharmacist-update/:treatmentId",
  verifyToken,
  treatmentUpdateByPharmacist
);

router.get("/doctor", verifyToken, getPatientForDoctors);

router.get("/nursing", verifyToken, getPatientsForNurse);

module.exports = router;
