import React, { useState } from "react";
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
  const [staff, setStaff] = useState([
    {
      name: "Dr. Alice Johnson",
      position: "Cardiologist",
      contact: "alice.johnson@example.com",
    },
    {
      name: "Nurse Bob Smith",
      position: "Nurse",
      contact: "bob.smith@example.com",
    },
  ]);

  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    contact: "",
  });

  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddStaff = (e) => {
    e.preventDefault();
    setUserId("");
    setPassword("");
    setRole("");
    setShowForm(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
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

      <div>
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
                type="password" // Corrected type
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
              <td className="py-2 px-4 border-b">Name</td>
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{staffMember.name}</td>
                <td className="py-2 px-4 border-b">{staffMember.position}</td>
                <td className="py-2 px-4 border-b">{staffMember.contact}</td>
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
              <td className="py-2 px-4 border-b">Name</td>
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{staffMember.name}</td>
                <td className="py-2 px-4 border-b">{staffMember.position}</td>
                <td className="py-2 px-4 border-b">{staffMember.contact}</td>
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
              <td className="py-2 px-4 border-b">Name</td>
              <td className="py-2 px-4 border-b">Id</td>
              <td className="py-2 px-4 border-b">Contact</td>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{staffMember.name}</td>
                <td className="py-2 px-4 border-b">{staffMember.position}</td>
                <td className="py-2 px-4 border-b">{staffMember.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
