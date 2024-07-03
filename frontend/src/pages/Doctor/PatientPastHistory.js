import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";

function PatientPastHistory() {
  const { userId } = useParams();
  const [previousMedicalHistory, setPreviousMedicalHistory] = useState([]);

  useEffect(() => {
    getMedicalHistory();
  }, []);

  const getMedicalHistory = async () => {
    const url = `http://localhost:8000/medical-history/patient/${userId}`;
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

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <div>
        <h1>Past Health History</h1>
        <ul>
          {previousMedicalHistory.length > 0 ? (
            previousMedicalHistory.map((item) => <li>{item.reason}</li>)
          ) : (
            <li>No medical history found.</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default PatientPastHistory;
