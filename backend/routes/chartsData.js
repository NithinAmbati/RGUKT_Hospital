const express = require("express");
const router = express.Router();
const Medicines = require("../models");

router.get("/medicine-data", async (req, res) => {
  try {
    const medicines = await Medicines.find();

    const barData = processMedicineData(medicines);

    res.status(200).json(barData);
  } catch (error) {
    console.error("Error fetching medicines:", error.message);
    res.status(500).send(error.message);
  }
});

const processMedicineData = (medicines) => {
  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthData = Array(12).fill(0);

  medicines.forEach((medicine) => {
    const month = new Date(medicine.importDate).getMonth();
    monthData[month] += 1; // Increment the count for the month
  });

  const barData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Medicines Imported",
        data: monthData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return barData;
};

module.exports = router;
