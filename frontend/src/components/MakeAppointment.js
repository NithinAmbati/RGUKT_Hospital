import { Button } from "@mui/material";
import React from "react";

const MakeAppointment = () => {
  return (
    <form className="flex flex-col max-w-[400px]  space-y-4 shadow-md p-3">
      <h1>Make Appointment</h1>
      <label>Reason: </label>
      <input type="text" />
      <label>Description: </label>
      <textarea rows="4" cols="30" />
      <label>Suffering From:</label>
      <input type="date" name="date" />
      <Button type="submit" variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};

export default MakeAppointment;
