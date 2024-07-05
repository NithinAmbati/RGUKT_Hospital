import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

function PatientPastHistory() {
  const { userId } = useParams();
  const [previousMedicalHistory, setPreviousMedicalHistory] = useState([]);

  useEffect(() => {
    const getMedicalHistory = async () => {
      const url = `https://rgukt-hospital-apis.vercel.app/medical-history/patient/${userId}`;
      const options = {
        method: "GET",
        headers: {
          contentType: "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setPreviousMedicalHistory(data);
      }
    };
    getMedicalHistory();
  }, [userId]);

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Past Health History
        </h1>
        <ul className="space-y-4">
          {previousMedicalHistory.length > 0 ? (
            previousMedicalHistory.map((item, index) => (
              <li
                key={index}
                className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto"
              >
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Reason:</span> {item.reason}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Appointment Date:</span>{" "}
                  {item.appointmentDate}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Suffering From:</span>{" "}
                  {item.sufferingFrom}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Description:</span>{" "}
                  {item.description}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Treated By:</span>{" "}
                  {item.treatedBy}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-bold">Medicines Given By:</span>{" "}
                  {item.medicinesGivenby}
                </p>
                {item.status === "treated" ? (
                  <Button variant="contained" color="success">
                    Treated
                  </Button>
                ) : (
                  <Button variant="contained">Pending</Button>
                )}
              </li>
            ))
          ) : (
            <li className="text-center text-gray-700">
              No medical history found.
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default PatientPastHistory;
