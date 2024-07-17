import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const SelectMedicines = (props) => {
  const { medicines, selectedMedicines, onChange } = props;
  const handleChange = (event, value) => {
    const newSelectedMedicines = value.map((name) => ({
      name,
      quantity: 1,
    }));
    onChange(newSelectedMedicines);
  };

  const handleQuantityChange = (name, quantity) => {
    const updatedMedicines = selectedMedicines.map((med) =>
      med.name === name ? { ...med, quantity } : med
    );
    onChange(updatedMedicines);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
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
                label={`${option} (${
                  selectedMedicines.find((med) => med.name === option)
                    ?.quantity || 1
                })`}
                {...getTagProps({ index })}
              />
            ))
          }
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
        />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        {selectedMedicines.map(({ name, quantity }) => (
          <div
            key={name}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <TextField
              label={name}
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(name, e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ width: "100px", marginBottom: "10px" }}
            />
          </div>
        ))}
      </Box>
    </div>
  );
};

export default SelectMedicines;
