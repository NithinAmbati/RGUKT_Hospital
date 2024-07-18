import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import { NursingHeaderContent } from "../../store/data";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Button } from "@mui/material";

// This component will be used to update the treatment of the student by nurse after Doctor treatment
const NursingSecondPage = () => {
  const [pendingList, setPendingList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // To display the entire pending treatments to update the treatment
  useEffect(() => {
    const fetchPendingList = async () => {
      const url = "http://localhost:8000/treatments/nursing";
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };

      const response = await fetch(url, options);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setPendingList(data);
      } else {
        console.log("Failed to fetch pending list");
      }
    };
    fetchPendingList();
  }, []);

  //To store the searched treatment
  const filterData = async () => {
    const url = `http://localhost:8000/treatments/nursing?studentId=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const filteredPendingList = await response.json();
      console.log(filteredPendingList);
      setPendingList(filteredPendingList);
    }
  };

  // Update Form Functionality
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const handleChange = (field, value) => {
    setSelectedTreatment({ ...selectedTreatment, [field]: value });
  };

  const handleUpdateClick = (treatment) => {
    setSelectedTreatment(treatment);
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setSelectedTreatment(null);
  };

  const submitBtn = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/treatments//nursing-update/${selectedTreatment._id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      body: JSON.stringify(selectedTreatment),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Treatment updated successfully!");
      handleCloseForm();
    } else {
      console.log("Failed to update treatment");
    }
  };

  return (
    <>
      <Header headerContent={NursingHeaderContent} />
      <main>
        {/* Search Bar */}
        <section className="mb-6">
          <div className="flex items-center bg-white p-3 rounded-lg shadow-md max-w-md mx-auto">
            <input
              type="search"
              placeholder="Search by Student ID"
              className="flex-grow p-2 border-none outline-none"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchTwoToneIcon className="text-gray-500 mr-3" />
            <Button variant="contained" onClick={filterData}>
              Search
            </Button>
          </div>
        </section>

        {/* To display the entire pending treatments to update the treatment */}
        <section className="bg-gray-100 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Pending Treatments
          </h2>
          <ul className="list-none space-y-6 max-w-2xl mx-auto">
            {pendingList.map((treatment) => (
              <li
                key={treatment._id}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    ID: {treatment.studentId}
                  </p>
                  <p className="text-gray-600">Status: {treatment.status}</p>
                </div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                  onClick={() => handleUpdateClick(treatment)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Update Treatment Form */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-center text-xl font-semibold mb-4">
                Update Treatment
              </h3>
              <form onSubmit={submitBtn}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="studentId"
                  >
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    value={selectedTreatment.studentId}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <h1 className="text-3xl font-bold text-center m-4">Vitals</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-semibold mb-2"
                      htmlFor="pulseRate"
                    >
                      Pulse Rate
                    </label>
                    <input
                      type="text"
                      id="pulseRate"
                      value={selectedTreatment.pulseRate}
                      onChange={(e) =>
                        handleChange("pulseRate", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-semibold mb-2"
                      htmlFor="bloodPressure"
                    >
                      Blood Pressure
                    </label>
                    <input
                      type="text"
                      id="bloodPressure"
                      value={selectedTreatment.bloodPressure}
                      onChange={(e) =>
                        handleChange("bloodPressure", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-semibold mb-2"
                      htmlFor="spo2"
                    >
                      SPO2
                    </label>
                    <input
                      type="text"
                      id="spo2"
                      value={selectedTreatment.spo2}
                      onChange={(e) => handleChange("spo2", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-semibold mb-2"
                      htmlFor="temperature"
                    >
                      Temperature
                    </label>
                    <input
                      type="text"
                      id="temperature"
                      value={selectedTreatment.temperature}
                      onChange={(e) =>
                        handleChange("temperature", e.target.value)
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-semibold mb-2"
                      htmlFor="weight"
                    >
                      Weight
                    </label>
                    <input
                      type="text"
                      id="weight"
                      value={selectedTreatment.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-semibold mb-2"
                      htmlFor="ecg"
                    >
                      ECG
                    </label>
                    <input
                      type="text"
                      id="ecg"
                      value={selectedTreatment.ecg}
                      onChange={(e) => handleChange("ecg", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Medicines
                    </label>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {selectedTreatment.medicinesWritten.length > 0 &&
                        selectedTreatment.medicinesWritten.map(
                          (medic, index) => (
                            <p key={index} className="text-gray-700">
                              {medic}
                            </p>
                          )
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default NursingSecondPage;
