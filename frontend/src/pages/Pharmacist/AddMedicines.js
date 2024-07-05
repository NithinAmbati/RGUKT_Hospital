import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { PharmacistsHeaderContent } from "../../store/data";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";

const AddMedicines = () => {
  const [medicinesList, setMedicinesList] = useState([]);
  const [newMedicines, setNewMedicines] = useState({});
  const [additionalMedicines, setAdditionalMedicines] = useState([]);

  const handleMedicines = (event) => {
    const { id, value } = event.target;
    setNewMedicines((prevState) => ({
      ...prevState,
      [id]: parseInt(value) || 0, // default to 0 if the value is not a number
    }));
  };

  const handleAdditionalMedicines = (index, field, value) => {
    const updatedMedicines = [...additionalMedicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      [field]: field === "quantity" ? parseInt(value) || 0 : value, // default to 0 if the value is not a number for quantity
    };
    setAdditionalMedicines(updatedMedicines);
  };

  const addNewMedicineField = () => {
    setAdditionalMedicines([...additionalMedicines, { name: "", quantity: 0 }]);
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const medicinesArray = Object.entries(newMedicines).map(
      ([name, quantity]) => ({ name, quantity })
    );

    const url = "http://localhost:8000/medicines";
    const options = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + Cookies.get("jwtToken"),
      },
      body: JSON.stringify({
        newMedicines: medicinesArray.concat(additionalMedicines),
      }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Medicines added successfully!");
      setNewMedicines({});
      setAdditionalMedicines([]);
    }
  };

  useEffect(() => {
    const getMedicines = async () => {
      const url = "http://localhost:8000/medicines";
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + Cookies.get("jwtToken"),
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setMedicinesList(data[0].medicines);
      }
    };
    getMedicines();
  }, []);

  return (
    <>
      <Header headerContent={PharmacistsHeaderContent} />
      <main className="py-10">
        <h1 className="text-2xl font-bold my-6 text-center">
          Add Medicines Page
        </h1>
        <form
          onSubmit={submitBtn}
          className="mt-4 bg-white p-6 rounded-lg shadow-md w-[90%] max-w-[600px] m-auto"
        >
          {medicinesList.map((medicine, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-1">
                {medicine.name}
              </label>
              <TextField
                id={medicine.name}
                label="Quantity"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleMedicines}
                className="w-full"
              />
            </div>
          ))}
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
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={addNewMedicineField}
            className="w-full mt-4"
            sx={{ marginTop: "10px" }}
          >
            Add New Medicine
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className="w-full"
            sx={{ marginTop: "10px" }}
          >
            Complete
          </Button>
        </form>
      </main>
    </>
  );
};

export default AddMedicines;
