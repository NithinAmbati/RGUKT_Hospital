import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
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
  //   const [ barData, setBarData ] = useState({});
  //   const [lineData, setLineData ] = useState({});
  //   const [pieData, setPieData ] = useState({});

  //   useEffect(() => {
  //     const getReports= async () => {
  //       const url1 = "http://localhost:8000/patient-admissions";
  //       const url2 = "http://localhost:8000/medicines-consumed";
  //       const url3 = "http://localhost:8000/patient-distributions";
  //       const options = {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       };

  //       const response1 = await fetch(url1, options);
  //       const data1 = await response1.json();

  //       const response2 = await fetch(url2,options);
  //       const data2 = await response2.json();

  //       const response3 = await fetch(url3, options);
  //       const data3 = await response3.json();

  //       setBarData({
  //         labels: data1.labels,
  //         datasets: [
  //           {
  //             label: "Patient Admissions",
  //             data: data1.patientAdmissions,
  //             backgroundColor: "rgba(75, 192, 192, 0.6)",
  //           },
  //         ],
  //       });

  //       setLineData({
  //         labels: data2.labels,
  //         datasets: [
  //           {
  //             label: "Medicines Consumed",
  //             data: data2.medicinesConsumed,
  //             fill: false,
  //             backgroundColor: "rgba(75, 192, 192, 1)",
  //           },
  //         ],
  //       });

  //       setPieData({
  //         labels: data3.labels,
  //         datasets: [
  //           {
  //             label: "Patient Distributions",
  //             data: data3.patientDistributions,
  //             backgroundColor: [
  //               "rgba(255, 99, 132, 0.6)",
  //               "rgba(54, 162, 235, 0.6)",
  //               "rgba(255, 206, 86, 0.6)",
  //               "rgba(75, 192, 192, 0.6)",
  //               "rgba(153, 102, 255, 0.6)",
  //               "rgba(255, 159, 64, 0.6)",
  //             ],
  //           },
  //         ],
  //       });
  //   }
  //   getReports();
  // },[]);

  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Patient Admissions",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

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
            <Bar data={barData} options={{ responsive: true }} />
          </div>
          <h3 className="text-center text-lg font-semibold text-blue-600 mt-3">
            Patient Admissions
          </h3>
        </div>

        <div className="flex flex-col">
          <div className="flex-grow bg-white p-4 rounded-lg shadow-md">
            <Line data={lineData} options={{ responsive: true }} />
          </div>
          <h3 className="text-center text-lg font-semibold text-blue-600 mt-3">
            Medicines Consumed
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
