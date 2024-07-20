const { Medicines } = require("../models");

const getMedicinesForAdmin = async (req, res) => {
  try {
    const data = await Medicines.find();
    res.send(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
};

module.exports = getMedicinesForAdmin;
