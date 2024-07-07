import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";

const AddMedicines = () => {
  const [additionalMedicines, setAdditionalMedicines] = useState([]);

  const handleAdditionalMedicines = (index, field, value) => {
    const updatedMedicines = [...additionalMedicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      [field]: field === "quantity" ? parseInt(value) || 0 : value,
    };
    setAdditionalMedicines(updatedMedicines);
  };

  const addNewMedicineField = () => {
    setAdditionalMedicines([
      ...additionalMedicines,
      { name: "", quantity: 0, expiryDate: "" },
    ]);
  };

  const submitBtn = async (event) => {
    event.preventDefault();

    const url = "http://localhost:8000/medicines";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      body: JSON.stringify({
        newMedicines: additionalMedicines,
      }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        alert("Medicines added successfully!");
        setAdditionalMedicines([]);
      } else {
        alert("Failed to add medicines. Please try again.");
      }
    } catch (error) {
      console.error("Error adding medicines:", error);
      alert("Error adding medicines. Please try again later.");
    }
  };

  return (
    <main className="py-10">
      <h1 className="text-2xl font-bold my-6 text-center">
        Add Medicines Page
      </h1>
      <form
        onSubmit={submitBtn}
        className="mt-4 bg-white p-6 rounded-lg shadow-md w-[90%] max-w-[600px] m-auto"
      >
        {additionalMedicines.map((medicine, index) => (
          <div key={index} className="mb-4 flex flex-col md:flex-row gap-4">
            <TextField
              label="Medicine Name"
              value={medicine.name}
              onChange={(e) =>
                handleAdditionalMedicines(index, "name", e.target.value)
              }
              className="w-full mb-2"
            />
            <TextField
              label="Quantity"
              type="number"
              value={medicine.quantity}
              onChange={(e) =>
                handleAdditionalMedicines(index, "quantity", e.target.value)
              }
              className="w-full"
            />
            <TextField
              label="Expiry Date"
              type="date"
              value={medicine.expiryDate}
              onChange={(e) =>
                handleAdditionalMedicines(index, "expiryDate", e.target.value)
              }
              className="w-full"
            />
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={addNewMedicineField}
          sx={{ marginBottom: "20px" }}
          className="w-full mt-4"
        >
          Add New Medicine
        </Button>

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="w-full mt-4"
        >
          Complete
        </Button>
      </form>
    </main>
  );
};

export default AddMedicines;
