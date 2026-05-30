import { useState } from 'react';
import axios from 'axios';
import type { NewDiaryEntry } from '../types';

const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const;
const visibilityOptions = ['great', 'good', 'ok', 'poor'] as const;

interface DiaryFormProps {
  addDiary: (entry: NewDiaryEntry) => Promise<void>;
}

const DiaryForm = ({ addDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<typeof weatherOptions[number]>('sunny');
  const [visibility, setVisibility] = useState<typeof visibilityOptions[number]>('great');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await addDiary({ date, weather, visibility, comment });
      setDate('');
      setWeather('sunny');
      setVisibility('great');
      setComment('');
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response) {
        setError(e.response.data.error);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>Add new diary entry</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          date: <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div>
          weather:
          {weatherOptions.map(w => (
            <label key={w} style={{ marginLeft: '0.5rem' }}>
              <input type="radio" name="weather" value={w} checked={weather === w} onChange={e => setWeather(e.target.value as typeof weatherOptions[number])} />
              {w}
            </label>
          ))}
        </div>
        <div>
          visibility:
          {visibilityOptions.map(v => (
            <label key={v} style={{ marginLeft: '0.5rem' }}>
              <input type="radio" name="visibility" value={v} checked={visibility === v} onChange={e => setVisibility(e.target.value as typeof visibilityOptions[number])} />
              {v}
            </label>
          ))}
        </div>
        <div>comment: <input value={comment} onChange={e => setComment(e.target.value)} /></div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;