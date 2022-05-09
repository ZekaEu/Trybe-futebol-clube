import Users from '../database/models/users';
import { IData } from './auth';

const getUser = async (userData: IData) => {
  const { email } = userData;
  const user = await Users.findOne({ where: { email } });
  if (!user) return { code: 404, data: 'User not found' };
  return { code: 200, data: user.role };
};

export default getUser;
