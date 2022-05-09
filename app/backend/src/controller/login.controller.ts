import { NextFunction, Request, Response } from 'express';
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

const getUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: { role } } = req.body;
    return res.status(200).json(role);
  } catch (e) {
    next(e);
  }
};

export {
  login,
  getUserRole,
};
