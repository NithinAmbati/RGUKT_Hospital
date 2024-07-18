import React from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";

const DoctorProfilePage = () => {
  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <main>DoctorProfilePage</main>;
    </>
  );
};

export default DoctorProfilePage;
