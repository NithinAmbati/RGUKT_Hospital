import React, { useState } from "react";
import { Button } from "@mui/material";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitBtn = async (event) => {
    event.preventDefault();
    const userDetails = {
      userId,
      password,
    };
    const url = "http://localhost:8000/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const jwtToken = data.jwtToken;
      Cookie.set("jwtToken", jwtToken, { expires: 1 });
      if (userId.startsWith("B")) navigate("/student");
      else if (userId.startsWith("D")) navigate("/doctor");
      else if (userId.startsWith("P")) navigate("/pharmacist");
    } else {
      alert("wrong");
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="heading">Login Page</h1>
      <form className="login-form-container" onSubmit={submitBtn}>
        <label>UserId :</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />

        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        
        <div>
          <input
            className="check-box"
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          show password
        </div>
        <br></br>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
