import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import PharmacistsHome from "./pages/Pharmacist/PharmacistsHome";
import DoctorsHome from "./pages/Doctor/DoctorsHome";
import AddMedicines from "./pages/Pharmacist/AddMedicines";
import MedicalHistory from "./pages/MedicalHistory";
import Staff from "./pages/Staff";
import AdminHome from "./pages/Admin/AdminHome.js";
import AddStudents from "./pages/Admin/StudentManagement.js";
import NursingHome from "./pages/NursingStation/NursingHome";
import NursingSecondPage from "./pages/NursingStation/NursingSecondPage";
import DoctorProfilePage from "./pages/Doctor/DoctorProfilePage";
import PharmacistProfilePage from "./pages/Pharmacist/PharmacistProfilePage";
import NursingProfilePage from "./pages/NursingStation/NursingProfilePage.js";
import ProtectedRoute from "./protected/ProtectedRoute";
import CheckAlreadyLogged from "./protected/CheckAlreadyLogged.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckAlreadyLogged component={HomePage} />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/staff" element={<Staff />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute component={DoctorsHome} requiredRole="doctor" />
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute
              component={DoctorProfilePage}
              requiredRole="doctor"
            />
          }
        />

        <Route
          path="/pharmacist"
          element={
            <ProtectedRoute
              component={PharmacistsHome}
              requiredRole="pharmacist"
            />
          }
        />
        <Route
          path="/pharmacist/add-medicines"
          element={
            <ProtectedRoute
              component={AddMedicines}
              requiredRole="pharmacist"
            />
          }
        />
        <Route
          path="/pharmacist/profile"
          element={
            <ProtectedRoute
              component={PharmacistProfilePage}
              requiredRole="pharmacist"
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute component={AdminHome} requiredRole="admin" />
          }
        />
        <Route
          path="/admin/add-students"
          element={
            <ProtectedRoute component={AddStudents} requiredRole="admin" />
          }
        />

        <Route
          path="/nursing"
          element={
            <ProtectedRoute component={NursingHome} requiredRole="nurse" />
          }
        />
        <Route
          path="/nursing/patient-details"
          element={
            <ProtectedRoute
              component={NursingSecondPage}
              requiredRole="nurse"
            />
          }
        />
        <Route
          path="/nursing/profile"
          element={
            <ProtectedRoute
              component={NursingProfilePage}
              requiredRole="nurse"
            />
          }
        />

        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
