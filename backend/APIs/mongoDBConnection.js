const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/RGUKT_Hospital";
//"mongodb+srv://nithinambati2:yLbT7wHeE14Surh1@cluster0.9qpuxmc.mongodb.net/RGUKT_Hospital?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log("Error connecting to DB:", err));

// Define User schemas
const userSchema1 = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  DOB: { type: Date, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: false },
  contactNumber: { type: String, required: true },
  parentName: { type: String, required: false },
  parentContactNumber: { type: String, required: false },
  longTermDiseases: { type: String, required: false },
});

const userSchema2 = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
  contactNumber: { type: String, required: false },
});

const useSchema3 = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: false },
  contactNumber: { type: String, required: false },
});

const useSchema4 = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  importDate: { type: Date, required: true },
});

const useSchema5 = new mongoose.Schema({
  studentId: { type: String, required: true },
  treatedBy: { type: String, required: false },
  medicineIssuedBy: { type: String, required: false },
  nursingStationBy: { type: String, required: false },
  treatmentDate: { type: Date, required: true },
  reason: { type: String, required: false },
  description: { type: String, required: false },
  temperature: { type: String, required: false },
  bloodPressure: { type: String, required: false },
  pulseRate: { type: String, required: false },
  weight: { type: String, required: false },
  ecg: { type: String, required: false },
  spo2: { type: String, required: false },
  labTest: { type: String, required: false },
  drugallergy: { type: String, required: false },
  advice: { type: String, required: false },
  medicinesWritten: { type: Array, required: false },
  status: { type: String, required: true },
});

const userSchema6 = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: false },
});

const Students = mongoose.model("students", userSchema1);
const Doctor = mongoose.model("doctors", userSchema2);
const Pharmacist = mongoose.model("pharmacists", useSchema3);
const Medicines = mongoose.model("medicines", useSchema4);
const Treatments = mongoose.model("treatments", useSchema5);
const Admin = mongoose.model("admin", userSchema6);

module.exports = { Students, Doctor, Pharmacist, Medicines, Treatments, Admin };
