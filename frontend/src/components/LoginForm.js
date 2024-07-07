import React, { useState } from "react";
import { Button } from "@mui/material";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

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
      if (userId.startsWith("D")) navigate("/doctor");
      else if (userId.startsWith("P")) navigate("/pharmacist");
      else if (userId.startsWith("A")) navigate("/admin");
    } else {
      alert("wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 min-w-[400px]">
      <h1 className="text-3xl font-bold mb-8">Login Page</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={submitBtn}
      >
        <label className="block text-gray-700 mb-2">UserId :</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        />

        <div className="flex justify-between  items-center mb-4">
          <div className="flex items-center mb-4 ">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-gray-700">Show password</span>
          </div>
          <a
            className="text-blue-500 hover:text-blue-700 mb-4 block text-xs underline"
            href="/signup"
          >
            Forgot password
          </a>
        </div>

        <Button
          variant="contained"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </Button>
        <a
          className="text-blue-500 hover:text-blue-700 mb-4 mt-2 block text-xs underline"
          href="/signup"
        >
          Create an account?
        </a>
      </form>
    </div>
  );
}

export default LoginForm;
