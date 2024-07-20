import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import {
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StaffManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const url = "http://localhost:8000/users/admins";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setAdmins(data);
    };

    const fetchDoctors = async () => {
      const url = "http://localhost:8000/users/doctors";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setDoctors(data);
    };

    const fetchNurses = async () => {
      const url = "http://localhost:8000/users/nurses";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setNurses(data);
    };

    const fetchPharmacists = async () => {
      const url = "http://localhost:8000/users/pharmacists";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setPharmacists(data);
    };

    fetchAdmins();
    fetchDoctors();
    fetchNurses();
    fetchPharmacists();
  }, []);

  const [newStaff, setNewStaff] = useState({
    role: "",
    userid: "",
    password: "",
  });

  const [role, setRole] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [showForm, setShowForm] = useState(false);

  const handleAddStaff = (e) => {
    e.preventDefault();

    setShowForm(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2">Admins</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{admin.userId}</td>
                <td className="py-2 px-4 border-b">{admin.username}</td>
                <td className="py-2 px-4 border-b">{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Staff Management
        </h2>
        {!showForm ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
          >
            Add Staff
          </Button>
        ) : (
          <IconButton color="secondary" onClick={() => setShowForm(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </div>

      <div className="mb-10">
        {showForm && (
          <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Add Staff</Typography>
            <form onSubmit={handleAddStaff}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="nurse">Nurse</MenuItem>
                  <MenuItem value="pharmacist">Pharmacist</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="User Id"
                value={userid}
                onChange={(e) => setUserId(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
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
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Doctors</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{doctor.userId}</td>
                <td className="py-2 px-4 border-b">{doctor.username}</td>
                <td className="py-2 px-4 border-b">{doctor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Nurses</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {nurses.map((nurse, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{nurse.userId}</td>
                <td className="py-2 px-4 border-b">{nurse.username}</td>
                <td className="py-2 px-4 border-b">{nurse.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          Pharmacists
        </h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Username</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {pharmacists.map((pharmacist, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{pharmacist.userId}</td>
                <td className="py-2 px-4 border-b">{pharmacist.username}</td>
                <td className="py-2 px-4 border-b">{pharmacist.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
