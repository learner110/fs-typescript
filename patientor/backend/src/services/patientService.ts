import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPublicPatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...entry, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) throw new Error('Patient not found');
  const newEntry = { id: uuid(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPublicPatients, getPatientById, addPatient, addEntryToPatient };