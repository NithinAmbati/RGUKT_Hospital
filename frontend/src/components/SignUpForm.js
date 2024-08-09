import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = ({ userIds, fetchUserIds }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("rgukt123");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (role) {
      setUserIdBasedOnRole(role);
    }
  }, [userIds, role]);

  const setUserIdBasedOnRole = (role) => {
    const { admin, doctor, nurse, pharmacist } = userIds;
    if (role === "admin") setUserId("A" + admin);
    else if (role === "doctor") setUserId("D" + doctor);
    else if (role === "nurse") setUserId("N" + nurse);
    else if (role === "pharmacist") setUserId("P" + pharmacist);
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const userDetails = {
      userId: userId.slice(1),
      username,
      password,
      role,
    };
    const url = "http://localhost:8000/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const { message } = response.json();
      toast.success(message);
      await fetchUserIds();
    } else {
      const { message } = await response.json();
      toast.error(message);
    }
    setUserId("");
    setUsername("");
  };

  const handleRoleChange = async (event) => {
    const value = event.target.value;
    setRole(value);
  };

  return (
    <div className="mb-10">
      <ToastContainer />
      <Paper sx={{ padding: 2, mt: 2 }}>
        <Typography variant="h6">Add Staff</Typography>
        <form onSubmit={submitBtn}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={handleRoleChange} required>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="nurse">Nurse</MenuItem>
              <MenuItem value="pharmacist">Pharmacist</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="UserId"
            value={userId}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label={`${role} Name`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={userId ? password : ""}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <div>
            <input
              className="m-2"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignUpForm;
