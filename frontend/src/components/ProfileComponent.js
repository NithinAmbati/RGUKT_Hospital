import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import ChangePasswordComponent from "./ChangePasswordComponent";

const ProfileComponent = ({ user }) => {
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState("false");

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
  }, []);

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
              <span className="font-bold">Name:</span> {profileData.name}
            </h2>
            <h2 className="text-lg font-medium">
              <span className="font-bold">Email:</span> {profileData.email}
            </h2>
            <h2 className="text-lg font-medium">
              <span className="font-bold">Mobile:</span>{" "}
              {profileData.contactNumber}
            </h2>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-medium mb-4">
              <span className="font-bold">Upload Your Image:</span>
            </h2>
            {/* <label className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer overflow-hidden"></label> */}
            <input type="file" className="" accept="image/*" />
            <span className="text-gray-500">Choose Image</span>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Save" : "Edit"}
        </Button>
      </div>
      <ChangePasswordComponent />
    </main>
  );
};

export default ProfileComponent;
