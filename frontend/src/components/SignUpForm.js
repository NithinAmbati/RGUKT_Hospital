import React, { useState } from "react";
import { Button } from "@mui/material";
import "./SignUpForm.css";

function SignUpForm() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const submitBtn = async (event) => {
    event.preventDefault();
    const userDetails = {
      userId,
      name,
      email,
      password,
    };
    const url = "http://localhost:8000/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Registration successful");
    } else {
      console.error("Failed to register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="heading">Sign Up Page</h1>
      <form className="signup-form-container" onSubmit={submitBtn}>
        <label>UserId :</label>
        <input
          type="text"
          name="UserId"
          placeholder="UserId"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <label>Full Name:</label>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          name="username"
          placeholder="EMAIL"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div>
          <input
            className="check-box"
            type="checkbox"
            name="terms"
            checked={showPassword}
            onChange={(event) => setShowPassword(!showPassword)}
          />
          show password
          <br></br>
          <a className="forget-password" href="/signup"> Forgot password</a>
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
