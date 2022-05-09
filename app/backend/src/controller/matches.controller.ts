import { NextFunction, Request, Response } from 'express';
import { getAllMatches, postMatch } from '../service/matches.service';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAllMatches();
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await postMatch(req.body);
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export { getAll, create };
