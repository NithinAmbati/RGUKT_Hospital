import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";

const NursingProfilePage = () => {
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      const url = "http://localhost:8000/profile/nurse";
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
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <main>
        <h1>Nurse Profile Page</h1>
        <h1>UserId: {profileData.userId}</h1>
        <h1>Name: {profileData.name}</h1>
        <h1>Email: {profileData.email}</h1>
      </main>
    </>
  );
};

export default NursingProfilePage;
