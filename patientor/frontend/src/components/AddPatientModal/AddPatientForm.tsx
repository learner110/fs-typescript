import { useState, SyntheticEvent } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import { PatientFormValues, Gender } from "../../types";

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState<Gender>("other"); 

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({ name, ssn, dateOfBirth, occupation, gender });
  };

  return (
    <Box component="form" onSubmit={addPatient} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <TextField
        label="Social security number"
        fullWidth
        margin="normal"
        value={ssn}
        onChange={({ target }) => setSsn(target.value)}
      />
      <TextField
        label="Date of birth"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dateOfBirth}
        onChange={({ target }) => setDateOfBirth(target.value)}
      />
      <TextField
        label="Occupation"
        fullWidth
        margin="normal"
        value={occupation}
        onChange={({ target }) => setOccupation(target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          label="Gender"
          value={gender}
          onChange={({ target }) => setGender(target.value as Gender)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddPatientForm;