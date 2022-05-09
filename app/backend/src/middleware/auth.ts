import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) return res.status(401).json({ message: 'Token not found' });

    const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');
    const verifiedData = jwt.verify(authToken, JWT_SECRET) as jwt.JwtPayload;

    res.locals.userData = verifiedData;

    next();
  } catch (e) {
    next(e);
  }
};

export default checkToken;
