import { Router } from 'express';
import checkToken from '../middleware/auth';
import { getAll, create, update } from '../controller/matches.controller';

const matchesRouter = Router();

matchesRouter.get('/', getAll);
matchesRouter.post('/', checkToken, create);
matchesRouter.patch('/:id/finish', update);

export default matchesRouter;
