import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Button,
  TextField,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

const Settings = () => {
  const [value, setValue] = useState(0);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newAdminUserId, setNewAdminUserId] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();

    setNewAdminUserId("");
    setNewAdminPassword("");
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Change Password" />
            <Tab label="Add New Admin" />
          </Tabs>
        </Paper>
        <Box sx={{ padding: 2 }}>
          {value === 0 && (
            <Paper sx={{ padding: 2, mt: 2 }}>
              <Typography variant="h6">Change Password</Typography>
              <form onSubmit={handlePasswordChange}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Change Password
                </Button>
              </form>
            </Paper>
          )}

          {value === 1 && (
            <Paper sx={{ padding: 2, mt: 2 }}>
              <Typography variant="h6">Add Admin</Typography>
              <form onSubmit={handleAddAdmin}>
                <TextField
                  fullWidth
                  label="UserId"
                  value={newAdminUserId}
                  onChange={(e) => setNewAdminUserId(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Save Admin
                </Button>
              </form>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Settings;
