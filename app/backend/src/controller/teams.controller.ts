import { NextFunction, Request, Response } from 'express';
import { getAllTeams, getTeamById } from '../service/teams.service';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAllTeams();
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { code, data } = await getTeamById(id);
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export { getAll, getById };
