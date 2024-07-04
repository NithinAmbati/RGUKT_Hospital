import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

const DoctorCheckUpPage = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState({});

  useEffect(() => {
    const getAppointmentDetails = async () => {
      const url = `http://localhost:8000/appointments/${appointmentId}`;
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
        setAppointmentDetails(data);
      } else {
        console.error("Error fetching appointment details");
      }
    };

    getAppointmentDetails();
  }, [appointmentId]);

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Doctors Checkup Page
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <p className="text-gray-700 mb-4">
            <span className="font-bold">Patient Name:</span>{" "}
            {appointmentDetails.userId}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-bold">Reason for Visit:</span>{" "}
            {appointmentDetails.reason}
          </p>
          <div className="flex space-x-4">
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() =>
                navigate(
                  `/doctor/doctor_check/${appointmentId}/past-history/${appointmentDetails.userId}`
                )
              }
            >
              View Past History
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() =>
                navigate(`/doctor/doctor_check/${appointmentId}/treatment`)
              }
            >
              Treat
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCheckUpPage;
