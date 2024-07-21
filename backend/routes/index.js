const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signUpRouter = require("./signUp");
const appointmentsRouter = require("./treatments");
const medicinesRouter = require("./medicines");
const studentDetailsRouter = require("./studentDetails");
const profileRouter = require("./profile");
const userDetailsRouter = require("./userDetails");
const adminChartsRouter = require("./chartsData");

const { ExistingUserIds } = require("../models");
const VerifyToken = require("../Middleware/VerifyToken");

// Use the routes from the different files

router.use("/login", loginRouter);
router.use("/signup", signUpRouter);
router.use("/treatments", appointmentsRouter);
router.use("/medicines", medicinesRouter);
router.use("/student-details", studentDetailsRouter);
router.use("/profile", profileRouter);
router.use("/users", userDetailsRouter);
router.use("/admin-charts-data", adminChartsRouter);

router.get("/latest-user-ids", VerifyToken, async (req, res) => {
  try {
    const data = await ExistingUserIds.find();
    let users = {
      doctor: 111111,
      nurse: 111111,
      pharmacist: 111111,
      admin: 111111,
    };
    data.map((element) => {
      users[element["role"]] = parseInt(element.userId) + 1;
    });
    res.status(200).send(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
