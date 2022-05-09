import { Router } from 'express';
import getAll from '../controller/matches.controller';

const matchesRouter = Router();

matchesRouter.get('/', getAll);

export default matchesRouter;
