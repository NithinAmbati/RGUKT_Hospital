import React from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import AddMedicinesManually from "../../components/AddMedicinesManually";
import AddMedicinesThroughExcel from "../../components/AddMedicinesThroughExcel";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AddMedicines = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (!jwtToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="py-10">
        <AddMedicinesManually />
        <AddMedicinesThroughExcel />
      </main>
    </>
  );
};

export default AddMedicines;
