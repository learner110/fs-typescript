import { z } from 'zod';
import { Gender } from './types.js';

const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  occupation: z.string(),
});

export const parseNewPatient = (object: unknown): z.infer<typeof NewPatientSchema> =>
  NewPatientSchema.parse(object);