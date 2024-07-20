import SearchTwoTone from "@mui/icons-material/SearchTwoTone";
import React, { useState } from "react";
import Cookies from "js-cookie";
import calculateAge from "../../services/calculateAge";

const StudentDetails = () => {
  const [studentData, setStudentData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const submitBtn = async () => {
    const studentDetailsUrl = `http://localhost:8000/student-details?studentId=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
    };
    const response = await fetch(studentDetailsUrl, options);
    if (response.ok) {
      const studentDetailsData = await response.json();
      setStudentData(studentDetailsData);
    } else {
      const msg = await response.text();
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <section className="mb-6 w-full max-w-lg">
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md">
          <input
            type="search"
            placeholder="Search by Student ID"
            className="flex-grow p-2 border-none outline-none text-gray-700"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg ml-2"
            onClick={submitBtn}
          >
            <SearchTwoTone />
          </button>
        </div>
      </section>
      {studentData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="mb-2 text-xl font-bold text-gray-800">
            <strong>Student ID: </strong>
            {studentData.studentId}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Name: </strong>
            {studentData.name}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Age: </strong>
            {calculateAge(studentData.DOB)}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Gender: </strong>
            {studentData.gender}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Blood Group: </strong>
            {studentData.bloodGroup}
          </h1>
          <h1 className="mb-2 text-lg text-gray-700">
            <strong>Parent Contact: </strong>
            {studentData.parentContact}
          </h1>
        </div>
      ) : searchInput ? (
        <div className="text-red-500 text-lg font-semibold">
          Student Not Found
        </div>
      ) : null}
    </div>
  );
};

export default StudentDetails;
