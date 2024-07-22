import React, { useEffect, useState } from "react";
import PaginationComponent from "../../components/PaginationComponent";
import Cookies from "js-cookie";
import formatDate from "../../services/FormatDate";
import ViewPatientFullDetails from "../../components/ViewPatientFullDetails";

const PatientsHistory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patientsData, setPatientsData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getPatientData = async () => {
      const url = `http://localhost:8000/treatments/admin?date=${new Date(
        selectedDate
      )}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const dataLength = data.length;
        setTotalPages(Math.ceil(dataLength / 10));
        setPatientsData(data);
      }
    };
    getPatientData();
  }, [selectedDate]);

  if (!patientsData) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (value) => {
    setPage(value);
  };

  const filteredPageData = patientsData.slice((page - 1) * 10, page * 10);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          Admission Records
        </h3>
        <label>Select Date: </label>
        <input
          type="date"
          className="my-3"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Student ID: </td>
              <td className="py-2 px-4 border-b">Admission Date</td>
              <td className="py-2 px-4 border-b">Reason</td>
              <td className="py-2 px-4 border-b">History</td>
            </tr>
          </thead>
          <tbody>
            {filteredPageData.map((patient, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{patient.studentId}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(patient.treatmentDate)}
                </td>
                <td className="py-2 px-4 border-b">{patient.reason}</td>
                <td className="py-2 px-4 border-b">
                  <ViewPatientFullDetails patientData={patient} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="flex justify-center mt-4">
        <PaginationComponent
          totalPages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default PatientsHistory;
