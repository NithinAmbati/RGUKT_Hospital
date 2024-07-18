const express = require("express");
const verifyToken = require("../Middleware/VerifyToken");
const {
  getPharmacistData,
  getDoctorData,
  getAdminData,
  getNurseData,
} = require("../controllers/getUserProfile");
const router = express.Router();

router.get("/pharmacist", verifyToken, getPharmacistData);
router.get("/doctor", verifyToken, getDoctorData);
router.get("/admin", verifyToken, getAdminData);
router.get("/nurse", verifyToken, getNurseData);

module.exports = router;
