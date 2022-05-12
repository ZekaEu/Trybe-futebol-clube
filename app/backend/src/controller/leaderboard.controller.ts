import { NextFunction, Request, Response } from 'express';
import getHomeTeamLeaderboard from '../service/leaderboard.service';

const read = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard = await getHomeTeamLeaderboard();
    const { code, data } = leaderboard;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export default read;
