import React from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent } from "../../store/data";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

const PatientsDetails = () => {
  return (
    <div>
      <Header headerContent={DoctorsHeaderContent} />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Patient Details</h1>
        <section className="mb-6">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search by Student ID"
              className="flex-grow p-2 border-none outline-none"
            />
            <SearchTwoToneIcon className="text-gray-500" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientsDetails;
