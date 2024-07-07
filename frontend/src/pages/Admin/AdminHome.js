import React from "react";
import Header from "../../components/Header";
import { AdminHeaderContent } from "../../store/data";

const AdminHome = () => {
  return (
    <>
      <Header headerContent={AdminHeaderContent} />
      <div>AdminHome</div>
    </>
  );
};

export default AdminHome;
