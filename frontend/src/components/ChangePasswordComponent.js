import React, { useState } from "react";
import { Modal, Button, Box, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

const ChangePasswordComponent = () => {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (oldPassword === newPassword) {
      alert("Old password is same as new password!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Passwords not matched!");
      return;
    }

    const url = "";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    };

    const response = fetch(url, options);
    if (response.ok) {
      alert("Password changed successfully!");
      handleClose();
    } else {
      const msg = await response.text();
      alert("Failed to change password: " + msg);
    }
  };

  console.log(oldPassword);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="flex flex-col gap-4">
            <TextField
              label="Old Password"
              type="password"
              variant="outlined"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Change Password
      </Button>
    </div>
  );
};

export default ChangePasswordComponent;
