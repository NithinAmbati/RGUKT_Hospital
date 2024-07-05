import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const medicines = [
  "Paracetamol",
  "Ibuprofen",
  "Aspirin",
  "Amoxicillin",
  "Metformin",
  "Atorvastatin",
  "Omeprazole",
  "Simvastatin",
  "Losartan",
  "Amlodipine",
];

function getStyles(name, selectedMedicines, theme) {
  return {
    fontWeight:
      selectedMedicines.some((med) => med.name === name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SelectMedicines = ({ onChange }) => {
  const theme = useTheme();
  const [selectedMedicines, setSelectedMedicines] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newSelectedMedicines =
      typeof value === "string"
        ? value.split(",")
        : value.map((name) => ({ name, quantity: 1 }));
    setSelectedMedicines(newSelectedMedicines);
    onChange(newSelectedMedicines);
  };

  const handleQuantityChange = (name, quantity) => {
    const updatedMedicines = selectedMedicines.map((med) =>
      med.name === name ? { ...med, quantity } : med
    );
    setSelectedMedicines(updatedMedicines);
    onChange(updatedMedicines);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-medicines-label">Medicines</InputLabel>
        <Select
          labelId="multiple-medicines-label"
          id="multiple-medicines"
          multiple
          value={selectedMedicines.map((med) => med.name)}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-medicines" label="Medicines" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedMedicines.map(({ name, quantity }) => (
                <Chip key={name} label={`${name} (${quantity})`} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {medicines.map((medicine) => (
            <MenuItem
              key={medicine}
              value={medicine}
              style={getStyles(medicine, selectedMedicines, theme)}
            >
              {medicine}
            </MenuItem>
          ))}
        </Select>
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
