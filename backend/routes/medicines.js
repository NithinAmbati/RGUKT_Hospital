const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Medicines, Treatments } = require("../models");
const verifyToken = require("../Middleware/VerifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const data = await Medicines.aggregate([
      {
        $match: {
          expiryDate: { $gt: new Date() },
        },
      },
      {
        $group: {
          _id: "$name",
          quantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          quantity: 1,
        },
      },
    ]);
    res.send(data);
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

router.post("/", verifyToken, async (req, res) => {
  console.log("HI");
  try {
    const { newMedicines } = req.body;
    await Medicines.insertMany(newMedicines);
    res.status(200).send("Succesful");
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

router.put("/", verifyToken, async (req, res) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }
  const jwtToken = authorization.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authentication Error");
  const payload = jwt.verify(jwtToken, "Nithin");
  try {
    const { userId } = payload;
    const { medicinesWritten, treatmentId } = req.body;

    for (let item of medicinesWritten) {
      let remainingQuantity = item.quantity;
      const currentDate = new Date();

      const medicines = await Medicines.find({
        name: item.name.toLowerCase(),
        expiryDate: { $gte: currentDate },
      }).sort({ expiryDate: 1 });

      for (let med of medicines) {
        if (remainingQuantity <= 0) break;

        if (med.quantity >= remainingQuantity) {
          await Medicines.updateOne(
            { _id: med._id },
            { $inc: { quantity: -remainingQuantity } }
          );
          remainingQuantity = 0;
        } else {
          remainingQuantity -= med.quantity;
          await Medicines.updateOne(
            { _id: med._id },
            { $set: { quantity: 0 } }
          );
        }
      }
    }

    await Treatments.updateOne(
      { _id: treatmentId },
      { $set: { status: "treated", medicineIssuedBy: userId } }
    );
    res.status(200).send("Successful");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// const deleteMedicines = async () => {
//   await Medicines.deleteMany({ quantity: 0 });
// };

// deleteMedicines();

module.exports = router;
