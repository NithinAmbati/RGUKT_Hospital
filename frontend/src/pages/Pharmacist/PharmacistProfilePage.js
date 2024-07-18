import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";

const PharmacistProfilePage = () => {
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      const url = "http://localhost:8000/pharmacist/profile";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        alert("Failed to fetch profile data");
      }
    };
    getProfileData();
  }, []);

  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <main>
        <h1>Pharmacist Profile Page</h1>
      </main>
    </>
  );
};

export default PharmacistProfilePage;
