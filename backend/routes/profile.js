const express = require("express");
const verifyToken = require("../Middleware/VerifyToken");
const router = express.Router();

router.get("/pharmacist", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const data = Pharmacist.find({ userId });
    res.status(200).send(data);
  } catch (error) {
    const msg = await error.text();
    res.status(500).send(msg);
  }
});

module.exports = router;
