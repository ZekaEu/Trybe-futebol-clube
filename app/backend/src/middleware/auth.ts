import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) return res.status(401).json({ error: 'Token not found' });

    let token = '';
    if (typeof authToken === 'string') token = authToken;

    const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');
    const verifiedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    res.locals.userData = verifiedToken;

    return next();
  } catch (e) {
    next(e);
  }
};

export default checkToken;
