import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/users';
import auth from './auth';

const loginTry = async (email: string, password: string) => {
  if (!email || !password) return { code: 400, data: { message: 'All fields must be filled' } };

  const user = await Users.findOne({ where: { email } });
  if (!user || !bcryptjs.compareSync(password, user.password) || password.length < 7) {
    return { code: 401, data: { message: 'Incorrect email or password' } };
  }

  const token = auth({ email, password });

  const result = {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email,
    },
    token,
  };
  return { code: 200, data: result };
};

export default loginTry;
