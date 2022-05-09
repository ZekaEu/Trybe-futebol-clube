import { Router } from 'express';
import { getAll, getById } from '../controller/teams.controller';

const teamsRouter = Router();

teamsRouter.get('/', getAll);
teamsRouter.get('/:id', getById);

export default teamsRouter;
