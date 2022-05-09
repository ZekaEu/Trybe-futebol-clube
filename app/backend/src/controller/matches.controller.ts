import { NextFunction, Request, Response } from 'express';
import getAllMatches from '../service/matches.service';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAllMatches();
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export default getAll;
