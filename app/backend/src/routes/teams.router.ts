import { Router } from 'express';
import getAll from '../controller/teams.controller';

const teamsRouter = Router();

teamsRouter.get('/', getAll);

export default teamsRouter;
