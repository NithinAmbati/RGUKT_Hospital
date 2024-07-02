import React from "react";
import { Button } from "@mui/material";

function LoginForm() {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <Button variant="contained">Submit</Button>
      </form>
    </div>
  );
}

export default LoginForm;
