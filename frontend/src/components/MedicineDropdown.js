import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectMedicines = (props) => {
  const { medicines, selectedMedicines, onChange } = props;

  const handleChange = (event, value) => {
    const newSelectedMedicines = value.map((name) => {
      const existingMedicine = selectedMedicines.find(
        (med) => med.name === name
      );
      return (
        existingMedicine || {
          name,
          quantity: 0,
          morning: 0,
          afternoon: 0,
          night: 0,
          foodTiming: "Before food",
          numberOfDays: 0,
        }
      );
    });
    onChange(newSelectedMedicines);
  };

  const handleFoodTimingChange = (name, foodTiming) => {
    const updatedMedicines = selectedMedicines.map((med) =>
      med.name === name ? { ...med, foodTiming } : med
    );
    onChange(updatedMedicines);
  };

  const handleTimingClick = (name, timeOfDay) => {
    const updatedMedicines = selectedMedicines.map((med) =>
      med.name === name
        ? {
            ...med,
            [timeOfDay]: med[timeOfDay] === 0 ? 1 : 0,
            quantity:
              (timeOfDay === "morning"
                ? med.morning === 0
                  ? 1
                  : 0
                : med.morning) *
                med.numberOfDays +
              (timeOfDay === "afternoon"
                ? med.afternoon === 0
                  ? 1
                  : 0
                : med.afternoon) *
                med.numberOfDays +
              (timeOfDay === "night" ? (med.night === 0 ? 1 : 0) : med.night) *
                med.numberOfDays,
          }
        : med
    );
    onChange(updatedMedicines);
  };

  const handleNumberOfDays = (name, value) => {
    const updatedMedicines = selectedMedicines.map((med) =>
      med.name === name
        ? {
            ...med,
            numberOfDays: value,
            quantity:
              med.morning * value + med.afternoon * value + med.night * value,
          }
        : med
    );
    onChange(updatedMedicines);
  };

  return (
    <div className="p-4">
      <FormControl sx={{ m: 1, width: 300 }} className="w-full mb-4">
        <InputLabel id="multiple-medicines-label"></InputLabel>
        <Autocomplete
          multiple
          id="multiple-medicines"
          options={medicines.map((medicine) => medicine.name)}
          value={selectedMedicines.map((med) => med.name)}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Medicines"
              onFocus={() => (params.InputProps.placeholder = "")}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                label={`${option.toUpperCase()} (${
                  selectedMedicines.find((med) => med.name === option)
                    ?.quantity || 1
                })`}
                {...getTagProps({ index })}
              />
            ))
          }
          getOptionLabel={(option) => option}
        />
      </FormControl>
      <Box sx={{ mt: 2 }} className="space-y-4">
        {selectedMedicines.map(
          ({
            name,
            quantity,
            morning,
            afternoon,
            night,
            foodTiming,
            numberOfDays,
          }) => (
            <div key={name} className="">
              <h1 className="font-bold capitalize">{name} :</h1>
              <div className="flex flex-col md:flex-row items-center gap-4 justify">
                <div className="flex items-center gap-2">
                  <TextField
                    type="text"
                    value={morning}
                    onClick={() => handleTimingClick(name, "morning")}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0, max: 1 } }}
                    className="w-12"
                  />
                  <TextField
                    type="text"
                    value={afternoon}
                    onClick={() => handleTimingClick(name, "afternoon")}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0, max: 1 } }}
                    className="w-12"
                  />
                  <TextField
                    type="text"
                    value={night}
                    onClick={() => handleTimingClick(name, "night")}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0, max: 1 } }}
                    className="w-12"
                  />
                </div>
                <FormControl className="w-36">
                  <Select
                    value={foodTiming}
                    onChange={(e) =>
                      handleFoodTimingChange(name, e.target.value)
                    }
                  >
                    <MenuItem value="Before food">Before food</MenuItem>
                    <MenuItem value="After food">After food</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Number of Days"
                  type="number"
                  value={numberOfDays}
                  className="w-24"
                  onChange={(e) => handleNumberOfDays(name, e.target.value)}
                />
                <label className="font-semibold">
                  Total Quantity: {quantity}
                </label>
              </div>
            </div>
          )
        )}
      </Box>
    </div>
  );
};

export default SelectMedicines;
