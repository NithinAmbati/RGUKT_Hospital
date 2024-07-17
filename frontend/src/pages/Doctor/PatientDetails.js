import React, { useState } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";

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
  const [pendingTreatment, setPendingTreatment] = useState({});
  const [treatedTreatments, setTreatedTreatments] = useState([]);

  const searchBtn = async () => {
    const pendingTreatmentUrl = `http://localhost:8000/treatments?studentId=${searchInput}&status=pending`;
    const treatedTreatmentsUrl = `http://localhost:8000/treatments?studentId=${searchInput}&status=treated`;
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
      console.log(studentDetailsData);
      setStudentDetails(studentDetailsData);
    }
  };

  const submitBtn = (e) => {
    e.preventDefault();
    // TODO: Send form data to server
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
            <Button variant="contained" onClick={searchBtn}>
              Search
            </Button>
          </div>
        </section>
        <section>
          <form
            className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md space-y-6"
            onSubmit={submitBtn}
          >
            <h1 className="text-3xl font-bold text-center mb-4">
              Student Details
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h1>Name: {studentDetails.name}</h1>
              <h1>Age: {calculateAge(studentDetails.DOB)}</h1>
              <h1>gender: {studentDetails.gender}</h1>
              <h1>bloodGroup: {studentDetails.bloodGroup}</h1>
              <h1>
                Long Term Diseases:{" "}
                {studentDetails.longTermDiseases &&
                  studentDetails.longTermDiseases.join(", ")}
              </h1>
            </div>
            <h1 className="text-3xl font-bold text-center mb-4">Vitals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                Pulse Rate:
                {pendingTreatment.pulseRate}
              </p>
              <p>Blood Pressure: {pendingTreatment.bloodPressure}</p>
              <p>SPO2: {pendingTreatment.spo2}</p>
              <p>Temperature: {pendingTreatment.temperature}</p>
              <p>Weight: {pendingTreatment.weight}</p>
              <p>ECG: {pendingTreatment.ecg}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label>HOPI</label>
              <textarea rows="4" cols="30" className="border-2"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label>Drugallergy</label>
              <textarea rows="4" cols="30" className="border-2"></textarea>
            </div>

            <TextField
              id="outlined-multiline-flexible"
              label="Advice"
              multiline
              maxRows={4}
              fullWidth
            />

            <h1 className="text-3xl font-bold text-center mb-4">Treatment</h1>
            {/* <SelectMedicines
              selectedMedicines={medicines}
              onChange={handleMedicineChange}
              medicines={availableMedicines}
            /> */}

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </section>
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">
          Past Health Records in Campus:
        </h2>
        <section className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <ul className="list-none space-y-4">
            {treatedTreatments &&
              treatedTreatments.map((item, index) => (
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
