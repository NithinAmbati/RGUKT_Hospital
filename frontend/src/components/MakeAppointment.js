import { useState } from "react";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";

const MakeAppointment = () => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [sufferingFrom, setSufferingFrom] = useState("");

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const url = "https://rgukt-hospital-apis.vercel.app/appointments";
    const appointment = {
      reason,
      description,
      sufferingFrom: formatDate(sufferingFrom),
      appointmentDate: formatDate(new Date()),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      body: JSON.stringify(appointment),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      alert("Appointment successful");
    } else {
      alert("Failed to make appointment");
    }
    setReason("");
    setDescription("");
    setSufferingFrom("");
  };

  return (
    <form
      className="flex flex-col max-w-md space-y-4 shadow-md p-6 mx-auto mt-8 bg-white rounded-lg"
      onSubmit={submitBtn}
    >
      <h1 className="text-2xl font-bold text-center">Make Appointment</h1>
      <label className="block text-sm font-medium text-gray-700">
        Reason:{" "}
      </label>
      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <label className="block text-sm font-medium text-gray-700">
        Description:{" "}
      </label>
      <textarea
        rows="4"
        cols="30"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <label className="block text-sm font-medium text-gray-700">
        Suffering From:
      </label>
      <input
        type="date"
        name="date"
        value={sufferingFrom}
        onChange={(e) => setSufferingFrom(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        className="mt-4"
      >
        Submit
      </Button>
    </form>
  );
};

export default MakeAppointment;
