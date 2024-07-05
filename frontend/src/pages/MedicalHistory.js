import React from "react";
import Header from "../components/Header";
import { MainPageHeaderContent } from "../store/data";

const MedicalHistory = () => {
  return (
    <>
      <Header headerContent={MainPageHeaderContent} />
      <main className="text-5xl text-center pt-10">Medical History</main>
    </>
  );
};

export default MedicalHistory;
