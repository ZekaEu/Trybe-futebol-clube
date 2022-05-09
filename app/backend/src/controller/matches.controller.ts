import { NextFunction, Request, Response } from 'express';
import { endMatch, getAllMatches, postMatch, updateMatch } from '../service/matches.service';

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

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeamGoals || awayTeamGoals) {
      const { code, data } = await updateMatch(id, homeTeamGoals, awayTeamGoals);
      return res.status(code).json(data);
    }

    const { code, data } = await endMatch(id);
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export { getAll, create, update };
