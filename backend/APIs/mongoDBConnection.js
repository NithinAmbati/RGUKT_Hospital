const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://nithinambati2:yLbT7wHeE14Surh1@cluster0.9qpuxmc.mongodb.net/RGUKT_Hospital?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Error connecting to DB:", err));

// Define User schemas
const userSchema1 = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: false },
  medicalHistory: { type: String, required: false },
});

const userSchema2 = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: false },
  patientsTreated: { type: String, required: false },
  qualifications: { type: String, required: false },
});

const useSchema3 = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: false },
  qualifications: { type: String, required: false },
});

const useSchema4 = new mongoose.Schema({
  medcineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Student = mongoose.model("students", userSchema1);
const Doctor = mongoose.model("doctors", userSchema2);
const Pharmacist = mongoose.model("pharmacists", useSchema3);
const Medicines = mongoose.model("medicines", useSchema4);

module.exports = { Student, Doctor, Pharmacist, Medicines };
