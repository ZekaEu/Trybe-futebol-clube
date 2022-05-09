import { NextFunction, Request, Response } from 'express';
import getAllTeams from '../service/teams.service';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAllTeams();
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export default getAll;
