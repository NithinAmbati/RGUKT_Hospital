import React, { useState } from "react";
import { Button } from "@mui/material";

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
      username: name,
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
      alert("User Already Exists");
    }
    setUserId("");
    setName("");
    setPassword("");
    setEmail("");
    setShowPassword(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <h1 className="text-3xl font-bold mb-8">Sign Up Page</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={submitBtn}
      >
        <label className="block text-gray-700 mb-2">UserId :</label>
        <input
          type="text"
          name="UserId"
          placeholder="UserId"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <label className="block text-gray-700 mb-2">Full Name:</label>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="text"
          name="username"
          placeholder="EMAIL"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <div className="flex items-center mb-4">
          <input
            className="mr-2 leading-tight"
            type="checkbox"
            name="terms"
            checked={showPassword}
            onChange={(event) => setShowPassword(!showPassword)}
          />
          <span className="text-gray-700">Show password</span>
        </div>
        <Button
          variant="contained"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Submit
        </Button>
        <a
          className="text-blue-500 hover:text-blue-700 mb-4 block underline mt-2"
          href="/login"
        >
          Already have an account? Login here!
        </a>
      </form>
    </div>
  );
}

export default SignUpForm;
