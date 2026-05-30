import express from 'express';
import type { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { calculator, type Operation } from './calculator.ts';

const app = express();
app.use(express.json());


app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({
    weight,
    height,
    bmi,
  });
});


app.post('/calculate', (req: Request, res: Response) => {
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.json({ result });
});


app.post('/exercises', (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const targetNum = Number(target);
  if (isNaN(targetNum)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const hours = daily_exercises.map((h: unknown) => Number(h));
  if (hours.some(isNaN)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(hours, targetNum);
  return res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});