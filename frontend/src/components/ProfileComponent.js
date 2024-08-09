import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ChangePasswordComponent from "./ChangePassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileComponent = ({ user }) => {
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState(false);
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
        const msg = await response.json();
        toast.error(msg);
      }
    };
    getProfileData();
  }, [user]);

  const handleProfileChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSubmit = async () => {
    const updatedProfile = {
      ...profileData,
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
      const msg = await response.json();
      toast.error(msg);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <ToastContainer />
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-blue-600">Profile</h1>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col m-4">
            <h2 className="text-lg font-medium mb-2">
              <span className="font-bold">User ID:</span> {profileData.userId}
            </h2>
            <h2 className="text-lg font-medium mb-2">
              <span className="font-bold">Name:</span>
              {editing ? (
                <input
                  type="text"
                  value={profileData.username || ""}
                  onChange={(e) =>
                    handleProfileChange("username", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                />
              ) : (
                <p>{profileData.username}</p>
              )}
            </h2>
            <h2 className="text-lg font-medium mb-2">
              <span className="font-bold">Email:</span>
              {editing ? (
                <input
                  type="email"
                  value={profileData.email || ""}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </h2>
            <h2 className="text-lg font-medium mb-2">
              <span className="font-bold">Mobile:</span>
              {editing ? (
                <input
                  type="text"
                  value={profileData.contactNumber || ""}
                  onChange={(e) =>
                    handleProfileChange("contactNumber", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                />
              ) : (
                <p>{profileData.contactNumber}</p>
              )}
            </h2>
          </div>
        </div>
        <button
          onClick={editing ? handleSubmit : () => setEditing(true)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>
      <ChangePasswordComponent user={user} />
    </main>
  );
};

export default ProfileComponent;
