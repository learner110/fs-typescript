import { useState, useEffect } from 'react';
import type { DiaryEntry, NewDiaryEntry } from './types';
import diaryService from './services/diaryService';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(data => setDiaries(data));
  }, []);

  const addDiary = async (entry: NewDiaryEntry) => {
    const newDiary = await diaryService.create(entry);
    setDiaries(diaries.concat(newDiary));
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;