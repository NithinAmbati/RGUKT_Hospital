import React from "react";
import { Button } from "@mui/material";

const PatientsHistory = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Patients History
      </h2>

      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          Admission Records
        </h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="font-semibold">
              <td className="py-2 px-4 border-b">Name</td>
              <td className="py-2 px-4 border-b">Admission Date</td>
              <td className="py-2 px-4 border-b">Reason</td>
              <td className="py-2 px-4 border-b">History</td>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">John Doe</td>
              <td className="py-2 px-4 border-b">2023-05-10</td>
              <td className="py-2 px-4 border-b">High blood pressure</td>
              <td className="py-2 px-4 border-b">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  View
                </Button>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">Jane Smith</td>
              <td className="py-2 px-4 border-b">2023-06-01</td>
              <td className="py-2 px-4 border-b">Asthma attack</td>
              <td className="py-2 px-4 border-b">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  View
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsHistory;
