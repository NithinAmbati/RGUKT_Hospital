import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import PharmacistsHome from "./pages/Pharmacist/PharmacistsHome";
import StudentHome from "./pages/Student/StudentHome";
import DoctorsHome from "./pages/Doctor/DoctorsHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/doctor" element={<DoctorsHome />} />
        <Route path="/pharmacist" element={<PharmacistsHome />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
