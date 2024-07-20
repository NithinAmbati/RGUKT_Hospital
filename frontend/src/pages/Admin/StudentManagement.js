import React, { useState } from "react";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const StudentManagement = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let studentsData = XLSX.utils.sheet_to_json(sheet);

      // Function to convert Excel date serial number to JavaScript Date object
      const excelDateToJSDate = (serial) => {
        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
        return new Date(excelEpoch.getTime() + serial * 86400000);
      };

      // Convert DOB to date format if it's a number
      studentsData = studentsData.map((student) => {
        if (typeof student.DOB === "number") {
          student.DOB = excelDateToJSDate(student.DOB);
        }
        return student;
      });

      console.log(studentsData);

      const url = "http://localhost:8000/student-details";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
        body: JSON.stringify({ studentsData }),
      };
      const response = await fetch(url, options);
      if (response.ok) {
        alert("Data uploaded successfully");
        console.log("File uploaded successfully:");
      } else {
        const msg = await response.text();
        alert(msg);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const jwtToken = Cookies.get("jwtToken");
  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <main className="mx-auto max-w-screen-lg p-4">
        <h1 className="mb-3 text-2xl font-semibold text-blue-600 text-center">
          Add Students Here{" "}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose Excel File (XLSX/XLS)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default StudentManagement;
