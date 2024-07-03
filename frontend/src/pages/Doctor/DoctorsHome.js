import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorsHome = () => {
  const navigate = useNavigate();
  const [appointmentsList, setAppointmentsList] = useState([]);

  const getAppointmentsList = async () => {
    const url = "http://localhost:8000/appointments";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        contentType: "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setAppointmentsList(data);
    }
  };

  useEffect(() => {
    getAppointmentsList();
  }, []);

  return (
    <div>
      <Header headerContent={DoctorsHeaderContent} />
      <div className="min-h-[100vh]">
        <h1>Appointments</h1>
        <ul>
          {appointmentsList.length > 0 ? (
            appointmentsList.map((appointment) => (
              <li key={appointment._id}>
                {appointment.userId} - {appointment.reason}
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(`/doctor/doctor_check/${appointment._id}`)
                  }
                >
                  {appointment.status}
                </Button>
              </li>
            ))
          ) : (
            <h1>NO appointemtns</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsHome;
