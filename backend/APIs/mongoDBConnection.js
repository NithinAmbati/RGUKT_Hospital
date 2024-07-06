const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/RGUKT_Hospital";
//"mongodb+srv://nithinambati2:yLbT7wHeE14Surh1@cluster0.9qpuxmc.mongodb.net/RGUKT_Hospital?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Error connecting to DB:", err));

// Define User schemas
const userSchema1 = new mongoose.Schema({
  studentID: { type: String, required: true },
  name: { type: String, required: true },
  DOB: { type: Date, required: true },
  gender: { type: String, required: true },
  longTernDiseases: { type: Array, required: false },
});

const userSchema2 = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: false },
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
  medicines: { type: Array, required: true },
});

const useSchema5 = new mongoose.Schema({
  studentId: { type: String, required: true },
  treatedBy: { type: String, required: true },
  medicineIssuedBy: { type: String, required: false },
  treatmentDate: { type: Date, required: true },
  reason: { type: String, required: true },
  description: { type: String, required: false },
  temperature: { type: String, required: false },
  bloodPressure: { type: String, required: false },
  pulseRate: { type: String, required: false },
  weight: { type: String, required: false },
  height: { type: String, required: false },
  medicinesWritten: { type: Array, required: true },
  medicinesGiven: { type: Array, required: true },
  status: { type: String, required: true },
});

const Student = mongoose.model("students", userSchema1);
const Doctor = mongoose.model("doctors", userSchema2);
const Pharmacist = mongoose.model("pharmacists", useSchema3);
const Medicines = mongoose.model("medicines", useSchema4);
const Treatments = mongoose.model("treatments", useSchema5);

module.exports = { Student, Doctor, Pharmacist, Medicines, Treatments };
