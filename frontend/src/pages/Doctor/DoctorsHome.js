import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import SelectMedicines from "../../components/SelectMedicines";
import { Spin } from "antd";

import "./DoctorsHome.css"; // Import the CSS file for styling

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

const DoctorsHome = () => {
  const [searchInput, setSearchInput] = useState("");
  const [studentDetails, setStudentDetails] = useState({});
  const [pendingTreatment, setPendingTreatment] = useState({});
  const [treatedTreatments, setTreatedTreatments] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAvailbleMedicines = async () => {
      const url = "http://localhost:8000/medicines";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setAvailableMedicines(data);
      } else {
        console.error("Failed to get medicines");
      }
    };
    getAvailbleMedicines();
  }, []);

  const handleMedicineChange = (selectedMedicines) => {
    setMedicines(selectedMedicines);
  };

  const searchBtn = async () => {
    setLoading(true);
    const pendingTreatmentUrl = `http://localhost:8000/treatments/doctor?studentId=${searchInput}&status=pending`;
    const treatedTreatmentsUrl = `http://localhost:8000/treatments/doctor?studentId=${searchInput}&status=treated`;
    const studentDetailsUrl = `http://localhost:8000/student-details?studentId=${searchInput}`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
    };
    const response1 = await fetch(pendingTreatmentUrl, options);
    if (response1.ok) {
      const pendingTreatmentData = await response1.json();
      console.log(pendingTreatmentData);
      if (pendingTreatmentData.length > 0) setShowData(true);
      setPendingTreatment(pendingTreatmentData[0]);
    }
    const response2 = await fetch(treatedTreatmentsUrl, options);
    if (response2.ok) {
      const treatedTreatmentData = await response2.json();
      console.log(treatedTreatmentData);
      setTreatedTreatments(treatedTreatmentData);
    }
    const response3 = await fetch(studentDetailsUrl, options);
    if (response3.ok) {
      const studentDetailsData = await response3.json();
      setStudentDetails(studentDetailsData);
    }
  };

  const submitBtn = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/treatments/doctor-update/${pendingTreatment._id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        ...pendingTreatment,
        medicinesWritten: medicines,
      }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Treatment marked as treated successfully");
    } else {
      alert("Failed to mark treatment as treated");
    }
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setPendingTreatment({ ...pendingTreatment, [field]: value });
  };

  return (
    <div>
      <Header headerContent={DoctorsHeaderContent} />
      <main className="container">
        <h1 className="text-3xl font-bold mb-6 text-center">Patient Details</h1>
        <section className="search-container">
          <input
            type="search"
            placeholder="Search by Student ID"
            className="search-input"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchTwoToneIcon className="search-icon" />
          <Button
            variant="contained"
            className="search-button"
            onClick={searchBtn}
          >
            Search
          </Button>
        </section>
        {showData && (
          <>
            <section className="form-container">
              <form onSubmit={submitBtn}>
                <h1 className="form-title">Student Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-field">
                  <h1 className="form-label">Name: {studentDetails.name}</h1>
                  <h1 className="form-label">
                    Age: {calculateAge(studentDetails.DOB)}
                  </h1>
                  <h1 className="form-label">
                    Gender: {studentDetails.gender}
                  </h1>
                  <h1 className="form-label">
                    Blood Group: {studentDetails.bloodGroup}
                  </h1>
                  <h1 className="form-label">
                    Long Term Diseases:{" "}
                    {studentDetails.longTermDiseases &&
                      studentDetails.longTermDiseases.join(", ")}
                  </h1>
                </div>
                <h1 className="form-title">Vitals</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 form-field">
                  <p>Pulse Rate: {pendingTreatment.pulseRate}</p>
                  <p>Blood Pressure: {pendingTreatment.bloodPressure}</p>
                  <p>SPO2: {pendingTreatment.spo2}</p>
                  <p>Temperature: {pendingTreatment.temperature}</p>
                  <p>Weight: {pendingTreatment.weight}</p>
                  <p>ECG: {pendingTreatment.ecg}</p>
                </div>
                <div className="form-field">
                  <label htmlFor="hopi" className="form-label">
                    HOPI
                  </label>
                  <textarea
                    id="hopi"
                    rows="4"
                    className="form-textarea"
                    value={pendingTreatment.hopi}
                    onChange={(e) => handleChange("hopi", e.target.value)}
                  ></textarea>
                </div>
                <div className="form-field">
                  <label htmlFor="reason" className="form-label">
                    Reason:
                  </label>
                  <input
                    id="reason"
                    type="text"
                    className="form-input"
                    value={pendingTreatment.reason}
                    onChange={(e) => handleChange("reason", e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <input
                    id="description"
                    type="text"
                    className="form-input"
                    value={pendingTreatment.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="labTest" className="form-label">
                    Lab Test:
                  </label>
                  <input
                    id="labTest"
                    type="text"
                    className="form-input"
                    value={pendingTreatment.labTest}
                    onChange={(e) => handleChange("labTest", e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="drugallergy" className="form-label">
                    Drug Allergy:
                  </label>
                  <textarea
                    id="drugallergy"
                    rows="4"
                    className="form-textarea"
                    value={pendingTreatment.drugallergy}
                    onChange={(e) =>
                      handleChange("drugallergy", e.target.value)
                    }
                  ></textarea>
                </div>
                <TextField
                  id="advice"
                  label="Advice"
                  multiline
                  maxRows={4}
                  fullWidth
                  value={pendingTreatment.advice}
                  onChange={(e) => handleChange("advice", e.target.value)}
                />
                <h1 className="form-title">Treatment</h1>
                <SelectMedicines
                  selectedMedicines={medicines}
                  onChange={handleMedicineChange}
                  medicines={availableMedicines}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="form-button"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </section>
            <h2 className="results-title">Past Health Records in Campus:</h2>
            <section className="results-container">
              <ul className="results-list">
                {treatedTreatments.map((item, index) => (
                  <li key={index} className="result-item">
                    <div className="result-details">
                      <p className="text-bold">Reason: {item.reason}</p>
                      <p className="text-normal">
                        Description: {item.description}
                      </p>
                      <p className="text-normal">
                        Treated By: {item.treatedBy}
                      </p>
                      <p className="text-normal">
                        Treatment Date: {item.treatmentDate}
                      </p>
                      <p className="text-normal">
                        Temperature: {item.temperature}
                      </p>
                      <p className="text-normal">
                        Blood Pressure: {item.bloodPressure}
                      </p>
                      <p className="text-normal">
                        Pulse Rate: {item.pulseRate}
                      </p>
                      <p className="text-normal">Weight: {item.weight}</p>
                      <p className="text-normal">Height: {item.height}</p>
                      <p className="text-normal">
                        Medicines Written: {item.medicinesWritten.join(", ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default DoctorsHome;
