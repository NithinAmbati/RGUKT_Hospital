import React from "react";
import "../../css/PatientManagement.css";

const PatientManagement = () => {
  return (
    <div className="patient-management">
      <h2>Patient Records</h2>
      <div className="patient-section">
        <h3>Patient Profiles</h3>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Medical History</th>
              <th>Current Treatment Plans</th>
              <th>Prescriptions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Hypertension, Diabetes</td>
              <td>Blood pressure control, Insulin therapy</td>
              <td>Lisinopril, Metformin</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>Asthma</td>
              <td>Inhaled corticosteroids</td>
              <td>Fluticasone</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="patient-section">
        <h3>Admission Records</h3>
        <table className="admission-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Admission Date</th>
              <th>Discharge Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>2023-05-10</td>
              <td>2023-05-15</td>
              <td>High blood pressure</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>2023-06-01</td>
              <td>2023-06-03</td>
              <td>Asthma attack</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;
