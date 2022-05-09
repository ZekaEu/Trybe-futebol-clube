import { Router } from 'express';
import { login, getUserRole } from '../controller/login.controller';
import checkToken from '../middleware/auth';

const loginRouter = Router();

loginRouter.post('/', login);
loginRouter.get('/validate', checkToken, getUserRole);

export default loginRouter;
