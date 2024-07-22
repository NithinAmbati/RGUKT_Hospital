import { Button } from "@mui/material";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [userId, setUserId] = useState("");
  const [msg, setMsg] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const sendEmailBtn = async () => {
    const url = `http://localhost:8000/forgot-password?userId=${userId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        setShowOtpInput(true);
        const data = await response.json();
        setMsg(data);
      } else {
        const msg = await response.json();
        setMsg(msg);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="h-[100vh] flex justify-center items-center">
      <form className="flex flex-col space-y-4 shadow-md p-6 max-w-[350px]">
        <h1 className="font-bold text-xl text-center">Forgot Password</h1>
        <input
          type="text"
          id="userId"
          placeholder="Enter Your userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="h-10 p-3"
        />
        <Button variant="contained" type="button" onClick={sendEmailBtn}>
          Send OTP Email
        </Button>
        {showOtpInput && (
          <input
            type="number"
            id="otp"
            placeholder="Enter the OTP sent to your registered mobile or email"
            className="h-10 p-3"
          />
        )}
        <p>{msg}</p>
      </form>
    </main>
  );
};

export default ForgotPassword;
