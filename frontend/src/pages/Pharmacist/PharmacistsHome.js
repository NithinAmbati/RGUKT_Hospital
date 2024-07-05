import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

function PharmacistsHome() {
  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    const getPatientsList = async () => {
      const url = "http://localhost:8000/appointments?status=giveMedicine";
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPatientsList(data);
      }
    };
    getPatientsList();
  }, []);

  const giveMedicine = async () => {
    // const url = `http://localhost:8000/appointments/${patient._id}`;
    // const options = {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //     Authorization: `Bearer ${Cookies.get("jwtToken")}`,
    //   },
    //   body: JSON.stringify({ status: "medicineGiven" }),
    // };
    // const response = await fetch(url, options);
    // if (response.ok) {
    //   const data = await response.json();
    // } else {
    //   console.error("Error giving medicine");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Pharmacist Home</h1>
        <section>
          <input
            type="search"
            placeholder="Search by userId"
            className="mb-3 p-4"
          />
        </section>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {patientsList.map((patient) => (
            <li key={patient._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                User ID: {patient.userId}
              </h2>
              <p className="text-gray-600 mb-2">Reason: {patient.reason}</p>
              <div className="mb-2">
                <p className="font-semibold">Medicines:</p>
                <ul className="list-disc list-inside">
                  {patient.medicines.map((medicine, index) => (
                    <li key={index}>
                      {medicine.name} - {medicine.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600">
                No of days for medicine: {patient.noOfDaysOfMedicines}
              </p>
              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "10px" }}
                onClick={giveMedicine}
              >
                {patient.status}
              </Button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default PharmacistsHome;
