import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Navigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PrintablePatient from "../../components/PrintPrescription";
function PharmacistsHome() {
  const [patientsList, setPatientsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const printRefs = useRef({});

  useEffect(() => {
    const fetchPatientsList = async () => {
      const url = `http://localhost:8000/treatments/pharmacist`;
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setPatientsList(data);
      } else {
        throw new Error("Failed to fetch patients list");
      }
    };
    fetchPatientsList();
  }, [searchInput]);

  const submitBtn = (medicinesWritten, treatmentId) => async () => {
    const url = `http://localhost:8000/treatments/pharmacist-update/${treatmentId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        medicinesWritten,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        console.log("Medicines Issued successfully");
        alert("Medicines Issued successfully");
      } else {
        const msg = await response.text();
        alert(msg);
      }
    } catch (error) {
      console.error("Error issuing medicines:", error);
    }
  };

  const filteredPatientsList = patientsList.filter((item) =>
    item.studentId.toLowerCase().includes(searchInput.toLowerCase())
  );

  const jwtToken = Cookies.get("jwtToken");
  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Pharmacist Home</h1>
        <section className="mb-6">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search by Student ID"
              className="flex-grow p-2 border-none outline-none"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <SearchTwoToneIcon className="text-gray-500" />
          </div>
        </section>
        {filteredPatientsList.length === 0 ? (
          <p className="text-center text-gray-600">No patients found</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatientsList.map((item) => (
              <li
                key={item._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Student ID: {item.studentId}
                  </h2>
                  <p className="text-gray-600 mb-2">Reason: {item.reason}</p>
                  <div className="mb-2">
                    <p className="font-semibold">Medicines:</p>
                    <ul className="list-disc list-inside">
                      {item.medicinesWritten.map((medicine, index) => (
                        <li key={index}>
                          {medicine.name} - {medicine.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={submitBtn(item.medicinesWritten, item._id)}
                  >
                    Issue Medicine
                  </Button>
                  <ReactToPrint
                    trigger={() => (
                      <Button color="success" variant="contained">
                        Print
                      </Button>
                    )}
                    content={() => printRefs.current[item._id]}
                    documentTitle="Patient Details"
                    pageStyle="@page { size: auto; margin: 20mm; }"
                  />
                </div>
                <div style={{ display: "none" }}>
                  <PrintablePatient
                    ref={(el) => (printRefs.current[item._id] = el)}
                    patient={item}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default PharmacistsHome;
