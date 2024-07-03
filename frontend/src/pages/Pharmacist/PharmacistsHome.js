import React from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";

function PharmacistsHome() {
  return (
    <div>
      <Header headerContent={PharmacistsHeaderContent} />
      <h1>Pharmacist Home</h1>
    </div>
  );
}

export default PharmacistsHome;
