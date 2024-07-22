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

  const submitOtp = async (event) => {
    event.preventDefault();
    const otp = document.getElementById("otp").value;
    console.log(otp);
    const url = `http://localhost:8000/forgot-password/verify`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, otp }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        alert(
          "Password reset successful. Please login with the Password rgukt123 and change the password after Login in the profile section."
        );
      } else {
        const msg = await response.json();
        alert(msg);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="h-[100vh] flex justify-center items-center">
      <form
        className="flex flex-col space-y-4 shadow-md p-6 max-w-[350px]"
        onSubmit={submitOtp}
      >
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
          <>
            <input
              type="number"
              id="otp"
              placeholder="Enter the OTP sent to your registered mobile or email"
              className="h-10 p-3"
            />
            <Button variant="contained" type="submit">
              Submit OTP
            </Button>
          </>
        )}
        <p>{msg}</p>
      </form>
    </main>
  );
};

export default ForgotPassword;
