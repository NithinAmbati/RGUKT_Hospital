import React from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";

function Treatment() {
  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <div>
        <h1>Treatement</h1>
      </div>
    </>
  );
}

export default Treatment;
