import React from "react";
import Header from "../components/Header";
import { MainPageHeaderContent } from "../store/data";

const Emergency = () => {
  return (
    <>
      <Header headerContent={MainPageHeaderContent} />
      <main className="text-5xl text-center pt-10">Emergency</main>
    </>
  );
};

export default Emergency;
