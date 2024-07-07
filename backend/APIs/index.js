const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signUpRouter = require("./signUp");
const appointmentsRouter = require("./treatments");
const medicinesRouter = require("./medicines");
const studentDetailsRouter = require("./studentDetails");

// Use the routes from the different files

router.use("/login", loginRouter);
router.use("/signup", signUpRouter);
router.use("/treatments", appointmentsRouter);
router.use("/medicines", medicinesRouter);
router.use("/student-details", studentDetailsRouter);

module.exports = router;
