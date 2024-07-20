import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Cookies from "js-cookie";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ReportsAndAnalytics = () => {
  const [patientsAdmissionsData, setPatientsAdmissionsData] = useState(null);
  const [medicinesConsumedData, setMedicinesConsumedData] = useState(null);
  const [medicinesImportedData, setMedicinesImportedData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const chartsFetchingUrl = "http://localhost:8000/admin-charts-data";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };
      try {
        const response = await fetch(chartsFetchingUrl, options);
        if (response.ok) {
          const {
            medicinesImportedChartsData,
            medicinesConsumedChartsData,
            patientsChartsData,
          } = await response.json();
          setMedicinesConsumedData(medicinesConsumedChartsData);
          setMedicinesImportedData(medicinesImportedChartsData);
          setPatientsAdmissionsData(patientsChartsData);
        } else {
          console.error("Error fetching data:", await response.text());
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    getData();
  }, []);

  if (
    !medicinesConsumedData ||
    !medicinesImportedData ||
    !patientsAdmissionsData
  ) {
    return <div>Loading...</div>;
  }

  const pieData = {
    labels: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "Radiology",
    ],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
        ],
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Reports and Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col">
          <div className="flex-grow bg-white p-4 rounded-lg shadow-md">
            <Bar data={patientsAdmissionsData} options={{ responsive: true }} />
          </div>
          <h3 className="text-center text-lg font-semibold text-blue-600 mt-3">
            Patient Admissions
          </h3>
        </div>

        <div className="flex flex-col">
          <div className="flex-grow bg-white p-4 rounded-lg shadow-md">
            <Line
              data={{
                labels: medicinesConsumedData.labels, // Assuming both datasets share the same labels
                datasets: [
                  {
                    label: "Medicines Consumed",
                    data: medicinesConsumedData.datasets[0].data,
                    borderColor: "orange",
                    backgroundColor: "orange",
                  },
                  {
                    label: "Medicines Imported",
                    data: medicinesImportedData.datasets[0].data,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </div>
          <h3 className="text-center text-lg font-semibold text-blue-600 mt-3">
            Medicines Consumed vs Imported
          </h3>
        </div>

        <div className="flex flex-col">
          <div className="flex-grow bg-white p-4 rounded-lg shadow-md">
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
          <h3 className="text-center text-lg font-semibold text-blue-600 mt-3">
            Patient Distribution
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
