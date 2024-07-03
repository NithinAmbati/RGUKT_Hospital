import React from "react";
import Header from "../../components/Header";
import { StudentHeaderContent } from "../../store/data";
import MakeAppointment from "../../components/MakeAppointment";

function StudentHome() {
  return (
    <div>
      <Header headerContent={StudentHeaderContent} />
      <div className="min-h-[100vh] flex items-center justify-center">
        <MakeAppointment />
      </div>
    </div>
  );
}

export default StudentHome;
