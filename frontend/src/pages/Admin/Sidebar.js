import React from "react";
import "../../css/Sidebar.css";

const Sidebar = ({ setSelectedSection }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setSelectedSection("Home")}>
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </li>
        <li onClick={() => setSelectedSection("PatientManagement")}>
          <i className="fas fa-user-injured"></i> Patient Management
        </li>
        <li onClick={() => setSelectedSection("StaffManagement")}>
          <i className="fas fa-user-md"></i> Staff Management
        </li>
        <li onClick={() => setSelectedSection("InventoryManagement")}>
          <i className="fas fa-boxes"></i> Inventory Management
        </li>
        <li onClick={() => setSelectedSection("BillingAndFinance")}>
          <i className="fas fa-file-invoice-dollar"></i> Billing and Finance
        </li>
        <li onClick={() => setSelectedSection("ReportsAndAnalytics")}>
          <i className="fas fa-chart-line"></i> Reports and Analytics
        </li>
        <li onClick={() => setSelectedSection("Settings")}>
          <i className="fas fa-cogs"></i> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
