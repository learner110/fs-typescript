import express, { type Request, type Response } from 'express';
import diaryService from '../services/diaryService.ts';
import { type DiaryEntry, type NewDiaryEntry, type NonSensitiveDiaryEntry } from '../types.ts';
import { newDiaryParser, errorMiddleware } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.json(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<DiaryEntry>) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary) {
    res.json(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  '/',
  newDiaryParser,
  (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
    const added = diaryService.addDiary(req.body);
    res.json(added);
  }
);

router.use(errorMiddleware);

export default router;