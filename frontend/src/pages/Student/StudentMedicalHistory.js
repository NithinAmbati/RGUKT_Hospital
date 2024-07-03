import React from "react";
import Header from "../../components/Header";
import { StudentHeaderContent } from "../../store/data";

function StudentMedicalHistory() {
  return (
    <>
      <Header headerContent={StudentHeaderContent} />
      <div>
        <h1>Student Medical History</h1>
      </div>
    </>
  );
}

export default StudentMedicalHistory;
