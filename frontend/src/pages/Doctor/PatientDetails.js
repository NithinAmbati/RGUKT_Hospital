import React, { useState } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Button } from "@mui/material";

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

const PatientsDetails = () => {
  const [searchInput, setSearchInput] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [medicalDetails, setMedicalDetails] = useState([]);

  const submitBtn = async () => {
    const url = `http://localhost:8000/student-details?studentId=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const { studentInfo, medicalInfo } = await response.json();
      setStudentDetails(studentInfo);
      setMedicalDetails(medicalInfo);
    }
  };

  return (
    <div>
      <Header headerContent={DoctorsHeaderContent} />
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Patient Details</h1>
        <section className="mb-6">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search by Student ID"
              className="flex-grow p-2 border-none outline-none"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchTwoToneIcon className="text-gray-500 mr-3" />
            <Button variant="contained" onClick={submitBtn}>
              Search
            </Button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Student Details</h2>
          <div className="space-y-4">
            <h1 className="text-lg">
              <span className="font-semibold">Name:</span> {studentDetails.name}
            </h1>
            <h1 className="text-lg">
              <span className="font-semibold">ID:</span>{" "}
              {studentDetails.studentId}
            </h1>
            <h1 className="text-lg">
              <span className="font-semibold">Age:</span>{" "}
              {calculateAge(studentDetails.DOB)}
            </h1>
            <h1 className="text-lg">
              <span className="font-semibold">Gender:</span>{" "}
              {studentDetails.gender}
            </h1>
            <h1 className="text-lg">
              <span className="font-semibold">Long Term Diseases:</span>{" "}
              {studentDetails.longTermDiseases}
            </h1>
          </div>
        </section>
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">
          Past Health Records in Campus:
        </h2>
        <section className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <ul className="list-none space-y-4">
            {medicalDetails &&
              medicalDetails.map((item, index) => (
                <li key={index} className="py-4 border-b border-gray-200">
                  <div className="space-y-2">
                    <p className="text-gray-700 font-semibold">
                      Reason: {item.reason}
                    </p>
                    <p className="text-gray-500">
                      Description: {item.description}
                    </p>
                    <p className="text-gray-500">
                      Treated By: {item.treatedBy}
                    </p>
                    <p className="text-gray-500">
                      Treatment Date: {item.treatmentDate}
                    </p>
                    <p className="text-gray-500">
                      Temperature: {item.temperature}
                    </p>
                    <p className="text-gray-500">
                      Blood Pressure: {item.bloodPressure}
                    </p>
                    <p className="text-gray-500">
                      Pulse Rate: {item.pulseRate}
                    </p>
                    <p className="text-gray-500">Weight: {item.weight}</p>
                    <p className="text-gray-500">Height: {item.height}</p>
                    <p className="text-gray-500">
                      Medicines Written: {item.medicinesWritten.join(", ")}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default PatientsDetails;
