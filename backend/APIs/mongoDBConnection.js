const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://nithinambati2:yLbT7wHeE14Surh1@cluster0.9qpuxmc.mongodb.net/RGUKT_Hospital?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Error connecting to DB:", err));

// Define User schemas
const userSchema1 = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: false },
  contactNumber: { type: String, required: false },
  medicalHistory: { type: String, required: false },
});

const userSchema2 = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: false },
  patientsTreated: { type: String, required: false },
  qualifications: { type: String, required: false },
});

const useSchema3 = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
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

const useSchema5 = new mongoose.Schema({
  userId: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  reason: { type: String, required: true },
  description: { type: String, required: false },
  sufferingFrom: { type: String, required: true },
  status: { type: String, required: true },
  treatedBy: { type: String, required: false },
  temperature: { type: String, required: false },
  weight: { type: String, required: false },
  height: { type: String, required: false },
  pulseRate: { type: String, required: false },
  bloodPressure: { type: String, required: false },
  noOfDaysOfMedicines: { type: String, required: false },
  reviewAfter: { type: String, required: false },
  medicinesWritten: { type: Array, required: false },
  medicinesGiven: { type: Array, required: false },
  medicineIssuedBy: { type: String, required: false },
});

const Student = mongoose.model("students", userSchema1);
const Doctor = mongoose.model("doctors", userSchema2);
const Pharmacist = mongoose.model("pharmacists", useSchema3);
const Medicines = mongoose.model("medicines", useSchema4);
const Appointments = mongoose.model("appointments", useSchema5);

module.exports = { Student, Doctor, Pharmacist, Medicines, Appointments };
