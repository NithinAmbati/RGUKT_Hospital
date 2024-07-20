const express = require("express");
const verifyToken = require("../Middleware/VerifyToken");
const {
  getPharmacistProfile,
  getDoctorProfile,
  getAdminProfile,
  getNurseProfile,
} = require("../controllers/getUserProfile");
const {
  updatePharmacistProfile,
  updateDoctorProfile,
  updateAdminProfile,
  updateNurseProfile,
} = require("../controllers/updateUserProfile");
const {
  changePharmacistPassword,
  changeDoctorPassword,
  changeAdminPassword,
  changeNursePassword,
} = require("../controllers/changePassword");
const router = express.Router();

router.get("/pharmacist", verifyToken, getPharmacistProfile);
router.get("/doctor", verifyToken, getDoctorProfile);
router.get("/admin", verifyToken, getAdminProfile);
router.get("/nurse", verifyToken, getNurseProfile);

router.put("/pharmacist", verifyToken, updatePharmacistProfile);
router.put("/doctor", verifyToken, updateDoctorProfile);
router.put("/admin", verifyToken, updateAdminProfile);
router.put("/nurse", verifyToken, updateNurseProfile);

router.put(
  "/pharmacist/change-password",
  verifyToken,
  changePharmacistPassword
);
router.put("/doctor/change-password", verifyToken, changeDoctorPassword);
router.put("/admin/change-password", verifyToken, changeAdminPassword);
router.put("/nurse/change-password", verifyToken, changeNursePassword);

module.exports = router;
