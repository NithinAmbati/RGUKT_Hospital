import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

function PharmacistsHome() {
  const [patientsList, setPatientsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchPatientsList = async () => {
      const url = "http://localhost:8000/treatments?status=pending";
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setPatientsList(data);
        } else {
          throw new Error("Failed to fetch patients list");
        }
      } catch (error) {
        console.error("Error fetching patients list:", error);
      }
    };
    fetchPatientsList();
  }, []);

  const submitBtn = (medicinesWritten, treatmentId) => async () => {
    const url = "http://localhost:8000/medicines";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        medicinesWritten,
        treatmentId,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        console.log("Medicines Issued successfully");
        alert("Medicines Issued successfully");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error issuing medicines:", error);
    }
  };

  const filteredPatientsList = patientsList.filter((item) =>
    item.studentId.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Pharmacist Home</h1>
        <section className="mb-6">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search by userId"
              className="flex-grow p-2 border-none outline-none"
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
                  <Button color="success">{item.status}</Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={submitBtn(item.medicinesWritten, item._id)}
                  >
                    Issue Medicine
                  </Button>
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
