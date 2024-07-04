import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { StudentHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

const StudentMedicalHistory = () => {
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);

  useEffect(() => {
    const getMedicalHistoryList = async () => {
      const url = "http://localhost:8000/medical-history/patient";
      const options = {
        method: "GET",
        headers: {
          contentType: "application/json",
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setMedicalHistoryList(data);
      }
    };
    getMedicalHistoryList();
  }, []);

  return (
    <>
      <Header headerContent={StudentHeaderContent} />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 m-auto max-w-[500px]">
          <h1 className="text-2xl font-bold text-center mb-6">
            Medical History
          </h1>
          <ul className="space-y-4">
            {medicalHistoryList.length > 0 ? (
              medicalHistoryList.map((history) => (
                <li
                  key={history._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">Date:</span>{" "}
                    {history.appointmentDate}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Reason:</span>{" "}
                    {history.reason}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Description:</span>{" "}
                    {history.description}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Suffers from:</span>{" "}
                    {history.sufferingFrom}
                  </p>
                  <Button variant="contained" className="mt-4">
                    {history.status}
                  </Button>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">
                No medical history found.
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StudentMedicalHistory;
