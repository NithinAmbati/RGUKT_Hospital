const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signUpRouter = require("./signUp");
const appointmentsRouter = require("./treatments");
const medicinesRouter = require("./medicines");
const studentDetailsRouter = require("./studentDetails");
const profileRouter = require("./profile");

// Use the routes from the different files

router.use("/login", loginRouter);
router.use("/signup", signUpRouter);
router.use("/treatments", appointmentsRouter);
router.use("/medicines", medicinesRouter);
router.use("/student-details", studentDetailsRouter);
router.use("/profile", profileRouter);

module.exports = router;
