import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import { TextField, Button } from "@mui/material";
import SelectMedicines from "../../components/SelectMedicines";
import Cookies from "js-cookie";

function DoctorsHome() {
  const [studentId, setStudentId] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [availableMedicines, setAvailableMedicines] = useState([]);

  const handleMedicineChange = (selectedMedicines) => {
    setMedicines(selectedMedicines);
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const treatmentDetails = {
      studentId,
      reason,
      treatmentDate: new Date(),
      description,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      height,
      medicinesWritten: medicines,
    };
    const url = "http://localhost:8000/treatments";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(treatmentDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      setStudentId("");
      setReason("");
      setDescription("");
      setTemperature("");
      setBloodPressure("");
      setPulseRate("");
      setWeight("");
      setHeight("");
      setMedicines([]);

      alert("Treatment details updated successfully");
    } else {
      alert("Failed to update treatment details");
    }
  };

  useEffect(() => {
    const getAvailbleMedicines = async () => {
      const url = "http://localhost:8000/medicines";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
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

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <main className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <form
          className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md space-y-6"
          onSubmit={submitBtn}
        >
          <h1 className="text-3xl font-bold text-center mb-4">
            Student Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              id="outlined-multiline-flexible"
              label="Student ID"
              multiline
              maxRows={4}
              fullWidth
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Reason"
              multiline
              maxRows={4}
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Description</label>
            <textarea
              rows="4"
              cols="30"
              className="border-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">Examination</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              id="outlined-multiline-flexible"
              label="Temperature"
              multiline
              maxRows={4}
              fullWidth
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Blood Pressure"
              multiline
              maxRows={4}
              fullWidth
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Pulse Rate"
              multiline
              maxRows={4}
              fullWidth
              value={pulseRate}
              onChange={(e) => setPulseRate(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Height"
              multiline
              maxRows={4}
              fullWidth
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Weight"
              multiline
              maxRows={4}
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">Treatment</h1>
          <SelectMedicines
            selectedMedicines={medicines}
            onChange={handleMedicineChange}
            medicines={availableMedicines}
          />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </main>
    </>
  );
}

export default DoctorsHome;
