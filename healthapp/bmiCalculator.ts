export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

if (process.argv[1] === import.meta.filename) {
  try {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!');
    }
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}