const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signUpRouter = require("./signUp");

// Use the routes from the different files

router.use("/login", loginRouter);
router.use("/signup", signUpRouter);

module.exports = router;
