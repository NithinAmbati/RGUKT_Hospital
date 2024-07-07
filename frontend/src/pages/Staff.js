import React from "react";
import Header from "../components/Header";
import { MainPageHeaderContent } from "../store/data";

const Staff = () => {
  return (
    <>
      <Header headerContent={MainPageHeaderContent} />
      <div>Staff</div>
    </>
  );
};

export default Staff;
