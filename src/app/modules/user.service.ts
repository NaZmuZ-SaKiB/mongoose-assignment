import { TUpdateUser, TUser } from './user.interface';
import { User } from './user.model';

const postUserToDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

const updateUserInDB = async (userId: number, userData: TUpdateUser) => {
  if (isNaN(userId)) return null;

  const userExists: TUser | null = await User.userExists(userId);
  if (!userExists) return null;

  const res = await User.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true, runValidators: true },
  ).select({
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
    _id: 0,
  });
  return res;
};

const getAllUsersFromDB = async () => {
  const users = await User.find({}).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });

  return users;
};

const getUserByIDFromDB = async (userId: number) => {
  if (isNaN(userId)) return null;
  const user = await User.userExists(userId);
  return user;
};
export const UserServices = {
  postUserToDB,
  getAllUsersFromDB,
  getUserByIDFromDB,
  updateUserInDB,
};
