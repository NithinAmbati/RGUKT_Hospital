import React from "react";
import Header from "../../components/Header";
import { NursingHeaderContent } from "../../store/data";

const NursingSecondPage = () => {
  return (
    <>
      <Header headerContent={NursingHeaderContent} />
      <main>Nursing Second Page</main>
    </>
  );
};

export default NursingSecondPage;
