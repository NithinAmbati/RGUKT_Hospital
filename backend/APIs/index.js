const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signUpRouter = require("./signUp");
const appointmentsRouter = require("./appointments");
const medicalHistoryRouter = require("./medicalHistory");

// Use the routes from the different files

router.use("/login", loginRouter);
router.use("/signup", signUpRouter);
router.use("/appointments", appointmentsRouter);
router.use("/medical-history", medicalHistoryRouter);

module.exports = router;
