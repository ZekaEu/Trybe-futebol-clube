import { Router } from 'express';
import read from '../controller/leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', read);

export default leaderboardRouter;
