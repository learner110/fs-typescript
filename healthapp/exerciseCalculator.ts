interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;
  const diff = average - target;
  if (diff >= 0.5) {
    rating = 3;
    ratingDescription = 'excellent, well done!';
  } else if (diff >= 0) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (diff >= -0.5) {
    rating = 1;
    ratingDescription = 'too little, try harder';
  } else {
    rating = 1;
    ratingDescription = 'very poor';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};


if (process.argv[1] === import.meta.filename) {
  try {
    const args = process.argv.slice(2);
    if (args.length < 2) throw new Error('Not enough arguments');
    const target = Number(args[0]);
    const hours = args.slice(1).map(Number);
    if (isNaN(target) || hours.some(isNaN)) {
      throw new Error('Provided values were not numbers!');
    }
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}