import React from "react";
import { Button } from "@mui/material";
import "./SignUpForm.css";

function SignUpForm() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Sign Up Page</h1>
      <form className="signup-form-container">
        <label>Username:</label>
        <input type="text" name="username" />
        <label>Email:</label>
        <input type="text" name="username" />
        <label>Password:</label>
        <input type="password" name="password" />

        <div>
          <input type="checkbox" name="terms" /> showPassword
          <a href="#">forgot password</a>
        </div>

        <Button variant="contained">Submit</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
