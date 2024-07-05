import React from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";

const PharmacistMedicalHistory = () => {
  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="text-5xl text-center pt-10">
        Pharmacist Medical History
      </main>
    </>
  );
};

export default PharmacistMedicalHistory;
