import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import Cookies from "js-cookie";

const DoctorProfilePage = () => {
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      const url = "http://localhost:8000/profile/doctor";
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
        console.log(data);
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
        <h1>Doctor Profile Page</h1>
        <h1>UserId: {profileData.userId}</h1>
        <h1>Name: {profileData.name}</h1>
        <h1>Email: {profileData.email}</h1>
      </main>
    </>
  );
};

export default DoctorProfilePage;
