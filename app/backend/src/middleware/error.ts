import { NextFunction, Request, Response } from 'express';

export default (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
};
