import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export interface IData {
  email: string;
  password: string;
}

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');
const jwtconfig: jwt.SignOptions = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

export default (payload: IData) => jwt.sign(payload, JWT_SECRET, jwtconfig);
