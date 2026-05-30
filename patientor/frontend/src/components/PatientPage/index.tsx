import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { Patient, Diagnosis, Entry } from '../../types';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import EntryDetails from '../EntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.getById(id);
        setPatient(data);
      }
    };
    const fetchDiagnoses = async () => {
      const diagData = await diagnosisService.getAll();
      setDiagnoses(diagData);
    };
    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  const handleEntryAdded = (newEntry: Entry) => {
    if (patient) {
      setPatient({ ...patient, entries: [...patient.entries, newEntry] });
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        {patient.name}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>

      <Typography variant="h5" style={{ marginTop: '1rem' }}>entries</Typography>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnosesMap={new Map(diagnoses.map(d => [d.code, d]))} />
      ))}

      <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ mt: 2 }}>
        Add New Entry
      </Button>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        patientId={patient.id}
        onEntryAdded={handleEntryAdded}
        diagnoses={diagnoses}
      />
    </Box>
  );
};

export default PatientPage;