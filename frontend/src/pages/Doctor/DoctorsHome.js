import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

const DoctorsHome = () => {
  const navigate = useNavigate();
  const [appointmentsList, setAppointmentsList] = useState([]);

  const getAppointmentsList = async () => {
    const url =
      "https://rgukt-hospital-apis.vercel.app/appointments?status=pending";
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
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Appointments</h1>
        <section className="mb-6">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search by userId"
              className="flex-grow p-2 border-none outline-none"
            />
            <SearchTwoToneIcon className="text-gray-500" />
          </div>
        </section>
        <ul className="space-y-4 max-w-[600px] m-auto">
          {appointmentsList.length > 0 ? (
            appointmentsList.map((appointment) => (
              <li
                key={appointment._id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
              >
                <span>
                  {appointment.userId} - {appointment.reason}
                </span>
                <Button
                  variant="contained"
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() =>
                    navigate(`/doctor/doctor_check/${appointment._id}`)
                  }
                >
                  {appointment.status}
                </Button>
              </li>
            ))
          ) : (
            <h1 className="text-center text-gray-700">No appointments</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsHome;
