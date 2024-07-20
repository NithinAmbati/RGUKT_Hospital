import React, { useState } from "react";
import Header from "../../components/Header";
import { AdminHeaderContent } from "../../store/data";
import Sidebar from "./Sidebar";
import Profile from "./AdminProfile";
import PatientsHistory from "./PatientManagement";
import StaffManagement from "./StaffManagement";
import InventoryManagement from "./InventoryManagement";
import ReportsAndAnalytics from "./ReportsAndAnalytics";
import Settings from "./Settings";

import "../../css/Dashboard.css";
import StudentDetails from "./StudentDetails";

const AdminHome = () => {
  const [selectedSection, setSelectedSection] = useState("Profile");

  const renderContent = () => {
    switch (selectedSection) {
      case "Profile":
        return <Profile />;
      case "PatientsHistory":
        return <PatientsHistory />;
      case "StaffManagement":
        return <StaffManagement />;
      case "InventoryManagement":
        return <InventoryManagement />;
      case "ReportsAndAnalytics":
        return <ReportsAndAnalytics />;
      case "StudentDetails":
        return <StudentDetails />;
      case "Settings":
        return <Settings />;
      default:
        return (
          <div>
            <h1>Welcome to the Hospital Management Dashboard</h1>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Header headerContent={AdminHeaderContent} />
      <div className="dashboard-container">
        <Sidebar setSelectedSection={setSelectedSection} />
        <div className="dashboard-main">
          <h1 className="dashboard-heading">
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </h1>
          <div>{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
