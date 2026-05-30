import { useState } from 'react';
import {
  Modal, Box, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, Typography, Chip, OutlinedInput
} from '@mui/material';
import axios from 'axios';
import { Entry, HealthCheckRating, Diagnosis } from '../../types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto' as 'auto',
};

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
  diagnoses: Diagnosis[];
}

const AddEntryModal = ({ modalOpen, onClose, patientId, onEntryAdded, diagnoses }: Props) => {
  const [type, setType] = useState<'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'>('HealthCheck');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [error, setError] = useState('');

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.length ? diagnosisCodes : undefined,
    };
    let newEntry;
    if (type === 'HealthCheck') {
      newEntry = { ...baseEntry, type, healthCheckRating };
    } else if (type === 'OccupationalHealthcare') {
      newEntry = {
        ...baseEntry,
        type,
        employerName,
        sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined,
      };
    } else {
      newEntry = {
        ...baseEntry,
        type,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      };
    }
    try {
      const { data } = await axios.post<Entry>(
        `http://localhost:3001/api/patients/${patientId}/entries`,
        newEntry
      );
      onEntryAdded(data);
      onClose();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const errMsg = e.response.data?.error || JSON.stringify(e.response.data);
        setError(errMsg);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Modal open={modalOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Add New Entry</Typography>
        <form onSubmit={submit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Entry Type</InputLabel>
            <Select value={type} onChange={e => setType(e.target.value as any)}>
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>
          </FormControl>

          
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            margin="normal"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            margin="normal"
            required
            value={specialist}
            onChange={e => setSpecialist(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={e => setDiagnosisCodes(typeof e.target.value === 'string' ? [] : e.target.value)}
              input={<OutlinedInput label="Diagnosis Codes" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((code) => (
                    <Chip key={code} label={`${code} – ${diagnoses.find(d => d.code === code)?.name || ''}`} />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map(d => (
                <MenuItem key={d.code} value={d.code}>
                  {d.code} – {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {type === 'HealthCheck' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Health Rating</InputLabel>
              <Select value={healthCheckRating} onChange={e => setHealthCheckRating(e.target.value as HealthCheckRating)}>
                <MenuItem value={HealthCheckRating.Healthy}>0 – Healthy</MenuItem>
                <MenuItem value={HealthCheckRating.LowRisk}>1 – Low Risk</MenuItem>
                <MenuItem value={HealthCheckRating.HighRisk}>2 – High Risk</MenuItem>
                <MenuItem value={HealthCheckRating.CriticalRisk}>3 – Critical Risk</MenuItem>
              </Select>
            </FormControl>
          )}

          {type === 'OccupationalHealthcare' && (
            <>
              <TextField
                label="Employer Name"
                fullWidth
                margin="normal"
                required
                value={employerName}
                onChange={e => setEmployerName(e.target.value)}
              />
              <TextField
                label="Sick Leave Start"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveStart}
                onChange={e => setSickLeaveStart(e.target.value)}
              />
              <TextField
                label="Sick Leave End"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveEnd}
                onChange={e => setSickLeaveEnd(e.target.value)}
              />
            </>
          )}

          {type === 'Hospital' && (
            <>
              <TextField
                label="Discharge Date"
                type="date"
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                value={dischargeDate}
                onChange={e => setDischargeDate(e.target.value)}
              />
              <TextField
                label="Discharge Criteria"
                fullWidth
                margin="normal"
                required
                value={dischargeCriteria}
                onChange={e => setDischargeCriteria(e.target.value)}
              />
            </>
          )}

          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Add</Button>
          <Button onClick={onClose} variant="outlined" sx={{ mt: 2, ml: 2 }}>Cancel</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEntryModal;