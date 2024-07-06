const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signUpRouter = require("./signUp");
const appointmentsRouter = require("./treatments");
const medicalHistoryRouter = require("./medicalHistory");
const medicinesRouter = require("./medicines");

// Use the routes from the different files

router.use("/login", loginRouter);
router.use("/signup", signUpRouter);
router.use("/treatments", appointmentsRouter);
router.use("/medical-history", medicalHistoryRouter);
router.use("/medicines", medicinesRouter);

module.exports = router;
