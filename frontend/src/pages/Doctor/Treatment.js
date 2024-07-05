import React, { useState } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import { TextField, Button } from "@mui/material";
import SelectMedicines from "../../components/SelectMedicines";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

function Treatment() {
  const { appointmentId } = useParams();
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [noOfDaysOfMedicines, setNoOfDaysOfMedicines] = useState("");
  const [reviewAfter, setReviewAfter] = useState("");

  const handleMedicineChange = (selectedMedicines) => {
    setMedicines(selectedMedicines);
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const treatmentDetails = {
      temperature,
      bloodPressure,
      pulseRate,
      weight,
      height,
      medicines,
      noOfDaysOfMedicines,
      reviewAfter,
    };
    const url = `https://rgukt-hospital-apis.vercel.app/appointments/${appointmentId}/doctor`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(treatmentDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Treatment details updated successfully");
    } else {
      alert("Failed to update treatment details");
    }
  };

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <form
          className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md space-y-6"
          onSubmit={submitBtn}
        >
          <h1 className="text-3xl font-bold text-center mb-4">Examination</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              id="outlined-number"
              label="Temperature"
              type="number"
              fullWidth
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
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
          <SelectMedicines onChange={handleMedicineChange} />
          <TextField
            id="outlined-multiline-flexible"
            label="Number of Days"
            multiline
            maxRows={4}
            fullWidth
            value={noOfDaysOfMedicines}
            onChange={(e) => setNoOfDaysOfMedicines(e.target.value)}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Review After"
            multiline
            maxRows={4}
            fullWidth
            value={reviewAfter}
            onChange={(e) => setReviewAfter(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Treatment;
