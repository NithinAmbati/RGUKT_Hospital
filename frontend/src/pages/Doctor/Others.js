import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DoctorsHeaderContent, reasons } from "../../store/data";
import { Button, TextField, Autocomplete } from "@mui/material";
import Cookies from "js-cookie";
import SelectMedicines from "../../components/MedicineDropdown";

const Others = () => {
  const [pendingTreatment, setPendingTreatment] = useState({});
  const [medicines, setMedicines] = useState([]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [review, setReview] = useState("");
  const [medicineDisposed, setMedicineDisposed] = useState("");

  useEffect(() => {
    const getAvailbleMedicines = async () => {
      const url = "http://localhost:8000/medicines";
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
        setAvailableMedicines(data);
      } else {
        console.error("Failed to get medicines");
      }
    };
    getAvailbleMedicines();
  }, []);

  console.log(availableMedicines);

  const handleMedicineChange = (selectedMedicines) => {
    setMedicines(selectedMedicines);
  };

  const submitBtn = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/treatments/doctor-update/${pendingTreatment._id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        ...pendingTreatment,
        medicinesWritten: medicines,
        medicineDisposed,
        review,
      }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Treatment marked as treated successfully");
    } else {
      alert("Failed to mark treatment as treated");
    }
  };

  const handleChange = (field, value) => {
    if (field === "medicineDisposed") {
      setMedicineDisposed(value);
    } else if (field === "review") {
      setReview(value);
    } else {
      setPendingTreatment({ ...pendingTreatment, [field]: value });
    }
  };

  return (
    <>
      <Header headerContent={DoctorsHeaderContent} />
      <main className="container ">
        <section className="form-container mt-8">
          <form onSubmit={submitBtn}>
            <div className="form-field">
              <label htmlFor="reason" className="form-label">
                Reason:
              </label>
              <Autocomplete
                id="reason"
                options={reasons}
                value={pendingTreatment.reason}
                onChange={(e, value) => handleChange("reason", value)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </div>
            <div className="form-field">
              <label htmlFor="description" className="form-label">
                Provisional Diagnosis:
              </label>
              <input
                id="description"
                type="text"
                className="form-input"
                value={pendingTreatment.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="prescription" className="form-label">
                Prescription:
              </label>
              <SelectMedicines
                selectedMedicines={medicines}
                onChange={handleMedicineChange}
                medicines={availableMedicines}
                availableMedicines={availableMedicines}
                id="prescription"
              />
            </div>

            <div className="form-field">
              <label htmlFor="medicineDisposed" className="form-label">
                Medicine Disposed:
              </label>
              <textarea
                id="medicineDisposed"
                rows="2"
                className="form-textarea"
                value={medicineDisposed}
                onChange={(e) =>
                  handleChange("medicineDisposed", e.target.value)
                }
              ></textarea>
            </div>
            <div className="form-field">
              <TextField
                value={review}
                label="Review"
                fullWidth
                onChange={(e) => handleChange("review", e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </div>
            <div className="submit-btn-container">
              <Button
                type="submit"
                variant="contained"
                className="submit-button"
              >
                Submit
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Others;
