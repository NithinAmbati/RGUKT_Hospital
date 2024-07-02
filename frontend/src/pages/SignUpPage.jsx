import React from "react";
import { Button } from "@mui/material";

function SignUpPage() {
  return (
    <div>
      <h1>Sign Up Page</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Email:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" />
        </label>
        <Button variant="contained">Submit</Button>
      </form>
    </div>
  );
}

export default SignUpPage;
