const { Medicines, Treatments } = require("../models");

const treatmentUpdateByPharmacist = async (req, res) => {
  try {
    const { treatmentId } = req.params;
    const { userId } = req;
    const { medicinesGiven } = req.body;

    // Find the medicines and log the output
    const data = await Medicines.find();
    if (data.length === 0) {
      return res.status(404).send("Medicines not found");
    }

    const { medicines } = data[0];

    for (const medGiven of medicinesGiven) {
      const medItem = medicines.find((item) => item.name === medGiven.name);
      if (medItem) {
        medItem.quantity -= medGiven.medicineQuantity;
      }
    }

    await Medicines.findByIdAndUpdate(data[0]._id, { $set: { medicines } });

    await Treatments.findByIdAndUpdate(treatmentId, {
      $set: {
        medicinesGiven,
        medicineIssuedBy: userId,
        status: "treated",
      },
    });

    res.status(200).send("Updated Successfully");
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = await response.text();
    console.log(errorMessage);
  }
};

module.exports = treatmentUpdateByPharmacist;
