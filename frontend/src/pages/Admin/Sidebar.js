import React from "react";
import "../../css/Sidebar.css";

const Sidebar = ({ selectedSection, setSelectedSection }) => {
  const sections = [
    { name: "Profile", icon: "fas fa-user", key: "Profile" },
    {
      name: "Students Management",
      icon: "fas fa-user-graduate",
      key: "StudentDetails",
    },
    {
      name: "Staff Management",
      icon: "fas fa-user-md",
      key: "StaffManagement",
    },
    {
      name: "Patients History",
      icon: "fas fa-user-injured",
      key: "PatientsHistory",
    },
    {
      name: "Inventory",
      icon: "fas fa-boxes",
      key: "InventoryManagement",
    },
    {
      name: "Reports and Analytics",
      icon: "fas fa-chart-line",
      key: "ReportsAndAnalytics",
    },
    {
      name: "SummaryOfTheDay",
      icon: "fas fa-calendar-day",
      key: "SummaryOfTheDay",
    },
  ];

  return (
    <div className="sidebar bg-gray-800 text-white h-full fixed top-16">
      <ul className="list-none p-0">
        {sections.map((section) => (
          <li
            key={section.key}
            className={`flex items-center px-4 py-2 cursor-pointer  ${
              selectedSection === section.key
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedSection(section.key)}
          >
            <i className={`${section.icon} mr-3`}></i> {section.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
