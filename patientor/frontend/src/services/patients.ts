import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

const baseUrl = 'http://localhost:3001/api/patients';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(baseUrl);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${id}`);
  return data;
};

const create = async (values: PatientFormValues) => {
  const { data } = await axios.post<Patient>(baseUrl, values);
  return data;
};

export default { getAll, getById, create };