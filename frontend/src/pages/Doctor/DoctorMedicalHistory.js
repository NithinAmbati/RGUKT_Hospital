import React from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";

const DoctorMedicalHistory = () => {
  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <main className="text-5xl text-center pt-10">Doctor Medical History</main>
    </>
  );
};

export default DoctorMedicalHistory;
