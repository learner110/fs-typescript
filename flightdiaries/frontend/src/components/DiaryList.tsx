import type { DiaryEntry } from '../types';
import DiaryEntryComponent from './DiaryEntry';

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diaries</h2>
      {diaries.map(diary => (
        <DiaryEntryComponent key={diary.id} entry={diary} />
      ))}
    </div>
  );
};

export default DiaryList;