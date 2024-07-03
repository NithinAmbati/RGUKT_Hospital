import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@mui/material";

const DoctorCheckUpPage = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState({});

  const getAppointmentDetails = async () => {
    const url = `http://localhost:8000/appointments/${applicationId}`;
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

  useEffect(() => {
    getAppointmentDetails();
  }, []);

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <div>
        <h1>Doctors Checkup Page</h1>
        <div>
          <p>
            Patient Name: {appointmentDetails.userId}
            <br />
            Reason for Visit: {appointmentDetails.reason}
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(
                  `/doctor/doctor_check/${applicationId}/past-history/${appointmentDetails.userId}`
                )
              }
            >
              View Past History
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                navigate(`/doctor/doctor_check/${applicationId}/treatment`)
              }
            >
              Treat
            </Button>
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorCheckUpPage;
