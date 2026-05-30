import diaryEntries from '../../data/entries.ts';
import type { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types.ts';

const getEntries = (): DiaryEntry[] => diaryEntries;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] =>
  diaryEntries.map(({ id, date, weather, visibility }) => ({ id, date, weather, visibility }));

const findById = (id: number): DiaryEntry | undefined =>
  diaryEntries.find(d => d.id === id);

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newId = Math.max(...diaryEntries.map(d => d.id)) + 1;
  const newEntry = { id: newId, ...entry };
  diaryEntries.push(newEntry);
  return newEntry;
};

export default { getEntries, getNonSensitiveEntries, findById, addDiary };