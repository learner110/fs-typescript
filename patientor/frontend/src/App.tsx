import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { Patient } from './types';
import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    patientService.getAll().then(data => setPatients(data));
  }, []);

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={<PatientListPage patients={patients} setPatients={setPatients} />}
          />
          <Route path="/patients/:id" element={<PatientPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;