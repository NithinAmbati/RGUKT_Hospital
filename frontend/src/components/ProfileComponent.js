import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, TextField } from "@mui/material";
import ChangePasswordComponent from "./ChangePasswordComponent";
import axios from "axios";

const ProfileComponent = ({ user }) => {
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    const getProfileData = async () => {
      const url = `http://localhost:8000/profile/${user}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        const msg = await response.text();
        alert(msg);
      }
    };
    getProfileData();
  }, [user]);

  const handleProfileChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSubmit = async () => {
    let profileImageUrl = profileData.profileImageUrl;
    if (profileImage) {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", "image_preset");
      formData.append("cloud_name", "dqztnamkx");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqztnamkx/upload",
        formData
      );
      profileImageUrl = response.data.secure_url;
    }

    const updatedProfile = {
      ...profileData,
      profileImageUrl,
    };

    const url = `http://localhost:8000/profile/${user}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updatedProfile),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      await response.json();
      setProfileData(updatedProfile);
      setEditing(false);
    } else {
      const msg = await response.text();
      alert(msg);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-4">
        <h1 className="text-2xl font-semibold mb-4">Doctor Profile</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium">
              <span className="font-bold">User ID:</span> {profileData.userId}
            </h2>
            <h2 className="text-lg font-medium">
              <span className="font-bold">Name:</span>{" "}
              {editing ? (
                <TextField
                  type="text"
                  value={profileData.username || ""}
                  onChange={(e) =>
                    handleProfileChange("username", e.target.value)
                  }
                  fullWidth
                />
              ) : (
                <p>{profileData.username}</p>
              )}
            </h2>
            <h2 className="text-lg font-medium">
              <span className="font-bold">Email:</span>{" "}
              {editing ? (
                <TextField
                  type="text"
                  value={profileData.email || ""}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  fullWidth
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </h2>
            <h2 className="text-lg font-medium">
              <span className="font-bold">Mobile:</span>{" "}
              {editing ? (
                <TextField
                  type="text"
                  value={profileData.contactNumber || ""}
                  onChange={(e) =>
                    handleProfileChange("contactNumber", e.target.value)
                  }
                  fullWidth
                />
              ) : (
                <p>{profileData.contactNumber}</p>
              )}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-medium mb-4">
              <span className="font-bold">Upload Your Image:</span>
            </h2>
            <label className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer overflow-hidden relative">
              {profileImage || profileData.profileImageUrl ? (
                <img
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : profileData.profileImageUrl
                  }
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500">Choose Image</span>
              )}
              {editing && (
                <input
                  type="file"
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              )}
            </label>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={editing ? handleSubmit : () => setEditing(true)}
        >
          {editing ? "Save" : "Edit"}
        </Button>
      </div>
      <ChangePasswordComponent />
    </main>
  );
};

export default ProfileComponent;
