import { TUser } from './user.interface';
import { User } from './user.model';

const postUserToDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

export const UserServices = {
  postUserToDB,
};
