import type { DiaryEntry } from '../types';

const DiaryEntry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <strong>{entry.date}</strong> – weather: {entry.weather}, visibility: {entry.visibility}
      {entry.comment && <p>comment: {entry.comment}</p>}
    </div>
  );
};

export default DiaryEntry;