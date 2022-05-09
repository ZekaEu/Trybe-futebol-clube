import { Router } from 'express';
import checkToken from '../middleware/auth';
import { getAll, create } from '../controller/matches.controller';

const matchesRouter = Router();

matchesRouter.get('/', getAll);
matchesRouter.post('/', checkToken, create);

export default matchesRouter;
