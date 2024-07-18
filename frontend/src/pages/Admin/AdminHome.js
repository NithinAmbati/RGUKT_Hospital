import React, { useState } from "react";
import { Box, CssBaseline, Toolbar, Container } from "@mui/material";

import Header from "../../components/Header";
import { AdminHeaderContent } from "../../store/data";
import Sidebar from "./Sidebar";
import PatientManagement from "./PatientManagement";
import StaffManagement from "./StaffManagement";
import ReportsAndAnalytics from "./ReportsAndAnalytics";
import Settings from "./Settings";

import "../../css/Dashboard.css";

const AdminHome = () => {
  const [selectedSection, setSelectedSection] = useState("Home");

  const renderContent = () => {
    switch (selectedSection) {
      case "PatientManagement":
        return <PatientManagement />;
      case "StaffManagement":
        return <StaffManagement />;
      case "ReportsAndAnalytics":
        return <ReportsAndAnalytics />;
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
      <Box className="dashboard-container">
        <CssBaseline />
        <Sidebar setSelectedSection={setSelectedSection} />
        <Box component="main" className="dashboard-main">
          <Toolbar />
          <Container>{renderContent()}</Container>
        </Box>
      </Box>
    </>
  );
};

export default AdminHome;
