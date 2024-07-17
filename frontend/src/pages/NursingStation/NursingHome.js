import React from "react";
import Header from "../../components/Header";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const NursingHome = () => {
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [spo2, setSpo2] = useState("");
  const [studentId, setStudentId] = useState("");
  const [ecg, setECG] = useState("");

  const submitBtn = async (event) => {
    event.preventDefault();
    
    const Vitals = {
      studentId,
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      spo2,
      ecg,
    }

    // API call to save vitals
    const url = "http://localhost:8000/treatments";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Vitals),
    }
     
    const response = await fetch(url, options);

    if(response.ok){
    alert("Vitals saved successfully!");
    setTemperature("");
    setBloodPressure("");
    setPulseRate("");
    setWeight("");
    setSpo2("");
    setStudentId("");
    setECG("");

    const data = await response.json();
    console.log(data);
    }
    else{
      alert("Failed to save vitals. Please try again.");
    }
    
  };

  return (
    <>
      <Header headerContent={[]} />
      <main style = {{padding:'20px'}}>
        <form onSubmit={submitBtn}>
          <TextField
            id="outlined-multiline-flexible"
            label="Student ID"
            multiline
            maxRows={4}
            fullWidth
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <h1 className="text-3xl font-bold text-center m-4">Vitals</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              label="Blood Pressure"
              multiline
              maxRows={4}
              fullWidth
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="SPO2"
              multiline
              maxRows={4}
              fullWidth
              value={spo2}
              onChange={(e) => setSpo2(e.target.value)}
            />
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
              label="Weight"
              multiline
              maxRows={4}
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="ECG"
              multiline
              maxRows={4}
              fullWidth
              value={ecg}
              onChange={(e) => setECG(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" >
            Submit
            </Button>
          </div>
          
        </form>
      </main>
    </>
  );
};

export default NursingHome;
