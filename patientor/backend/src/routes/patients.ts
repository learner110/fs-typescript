import express, { type Request, type Response, type NextFunction } from 'express';
import patientService from '../services/patientService.ts'; 
import { NewPatientSchema, NewEntrySchema, type NonSensitivePatient, type NewPatient, type NewEntry } from '../types.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getPublicPatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => { 
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = NewPatientSchema.parse(req.body);
    const newPatient: NewPatient = validatedData;
    const added = patientService.addPatient(newPatient);
    res.json(added);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      next(error);
    }
  }
});

router.post('/:id/entries', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const newEntryData = NewEntrySchema.parse(req.body);
    const addedEntry = patientService.addEntryToPatient(req.params.id, newEntryData as NewEntry);
    return res.json(addedEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    } else {
      next(error);
      return; 
    }
  }
});

export default router;