const express = require("express");
const VerifyToken = require("../Middleware/VerifyToken");
const {
  getAdminDetails,
  getDoctorDetails,
  getNurseDetails,
  getPharmacistDetails,
} = require("../controllers/getUserDetails");
const router = express.Router();

router.get("/admins", VerifyToken, getAdminDetails);
router.get("/doctors", VerifyToken, getDoctorDetails);
router.get("/nurses", VerifyToken, getNurseDetails);
router.get("/pharmacists", VerifyToken, getPharmacistDetails);

module.exports = router;
