import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import PharmacistsHome from "./pages/Pharmacist/PharmacistsHome";
import DoctorsHome from "./pages/Doctor/DoctorsHome";
import AddMedicines from "./pages/Pharmacist/AddMedicines";
import Emergency from "./pages/Emergency";
import MedicalHistory from "./pages/MedicalHistory";
import Staff from "./pages/Staff";
import PatientDetails from "./pages/Doctor/PatientDetails";
import AdminHome from "./pages/Admin/AdminHome";
import AddStudents from "./pages/Admin/AddStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/staff" element={<Staff />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/doctor" element={<DoctorsHome />} />
        <Route path="/doctor/patient-details" element={<PatientDetails />} />

        <Route path="/pharmacist" element={<PharmacistsHome />} />
        <Route path="/pharmacist/add-medicines" element={<AddMedicines />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/add-students" element={<AddStudents />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
