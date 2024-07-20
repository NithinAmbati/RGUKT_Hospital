const { Medicines, Treatments } = require("../models");

const getAvailableMedicines = async (req, res) => {
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
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
};

const addMedicineStock = async (req, res) => {
  try {
    const { newMedicines } = req.body;
    await Medicines.insertMany(newMedicines);
    res.status(200).send("Succesful");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
};

const updateMedicineQuantity = async (req, res) => {
  try {
    const { userId } = req;
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
    console.error("Error:", error.message);
    res.status(500).send(error.message);
  }
};

const deleteMedicines = async () => {
  await Medicines.deleteMany({ quantity: 0 });
};

module.exports = {
  getAvailableMedicines,
  addMedicineStock,
  updateMedicineQuantity,
  deleteMedicines,
};
