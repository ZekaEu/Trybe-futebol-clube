import { NextFunction, Request, Response } from 'express';
import getUser from '../service/user.service';
import loginTry from '../service/login.service';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await loginTry(email, password);
    const { code, data } = user;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const getUserRole = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { userData } = res.locals;
    const { code, data } = await getUser(userData);
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export {
  login,
  getUserRole,
};
