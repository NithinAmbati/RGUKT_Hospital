const express = require("express");
const router = express.Router();
const VerifyToken = require("../Middleware/VerifyToken");
const { getChartsData } = require("../controllers/getChartsData");

router.get("/", VerifyToken, getChartsData);

module.exports = router;
