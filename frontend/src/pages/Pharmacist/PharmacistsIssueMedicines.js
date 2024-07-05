import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";

export const PharmacistsIssueMedicines = () => {
  const { appointmentId } = useParams();
  const [patientPrescription, setPatientPrescription] = useState([]);
  const [medicinesList, setMedicinesList] = useState([]);
  const [medicinesGiven, setMedicinesGiven] = useState({});

  useEffect(() => {
    const getPatientPrescription = async () => {
      const url = `http://localhost:8000/appointments/${appointmentId}/pharmacist`;
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setPatientPrescription(data.medicinesWritten);
      }
    };

    const getMedicines = async () => {
      const url = "http://localhost:8000/medicines";
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setMedicinesList(data[0].medicines);
      }
    };

    getPatientPrescription();
    getMedicines();
  }, [appointmentId]);

  const getAvailableCount = (medicineName) => {
    const medicine = medicinesList.find((m) => m.name === medicineName);
    return medicine ? medicine.quantity : 0;
  };

  const handleMedicinesGiven = (event) => {
    const { id, value } = event.target;
    setMedicinesGiven((prevState) => ({
      ...prevState,
      [id]: parseInt(value),
    }));
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const medicinesGivenArray = Object.entries(medicinesGiven).map(
      ([name, medicineQuantity]) => ({ name, medicineQuantity })
    );

    const url = `http://localhost:8000/appointments/${appointmentId}/pharmacist`;
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      body: JSON.stringify({ medicinesGiven: medicinesGivenArray }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Medicines issued successfully!");
    } else {
      alert("Failed to issue medicines!");
    }
    setMedicinesGiven({});
  };

  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Issuing Medicines</h1>
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          {patientPrescription.map((medicine, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{medicine.name}</p>
              <p>Available: {getAvailableCount(medicine.name)}</p>
            </div>
          ))}
          <form onSubmit={submitBtn} className="mt-4">
            {patientPrescription.map((medicine, index) => (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 mb-1">
                  {medicine.name}
                </label>
                <TextField
                  id={medicine.name}
                  label="Quantity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleMedicinesGiven}
                  className="w-full"
                />
              </div>
            ))}
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className="w-full mt-4"
            >
              Complete
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
