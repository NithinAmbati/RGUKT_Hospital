import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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
      selectedMedicines.indexOf(name) === -1
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
      typeof value === "string" ? value.split(",") : value;
    setSelectedMedicines(newSelectedMedicines);
    onChange(newSelectedMedicines);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-medicines-label">Medicines</InputLabel>
        <Select
          labelId="multiple-medicines-label"
          id="multiple-medicines"
          multiple
          value={selectedMedicines}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-medicines" label="Medicines" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
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
    </div>
  );
};

export default SelectMedicines;
