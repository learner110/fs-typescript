import express, { type Response } from 'express';
import diagnoses from '../../data/diagnoses.ts'; 
import type { Diagnosis } from '../../data/diagnoses.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnoses);
});

export default router;