import { TOrder, TUpdateUser, TUser } from './user.interface';
import { User } from './user.model';

const postUserToDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
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

const deleteUserFromDB = async (userId: number) => {
  if (isNaN(userId)) return null;
  const user = await User.userExists(userId);
  if (!user) return null;
  const response = await User.deleteOne({ userId });
  return response;
};

const createOrderInDB = async (userId: number, orderData: TOrder) => {
  if (isNaN(userId)) return null;

  const userExists: TUser | null = await User.userExists(userId);
  if (!userExists) return null;

  const response = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { new: true, runValidators: true },
  );

  return response;
};

const getAllOrdersOfUserFromDB = async (userId: number) => {
  if (isNaN(userId)) return null;

  const userExists: TUser | null = await User.userExists(userId);
  if (!userExists) return null;

  const response = await User.findOne({ userId }).select({
    'orders.productName': 1,
    'orders.price': 1,
    'orders.quantity': 1,
    _id: 0,
  });
  return response;
};

const getUsersTotalOrderPriceFromDB = async (userId: number) => {
  if (isNaN(userId)) return null;

  const userExists: TUser | null = await User.userExists(userId);
  if (!userExists) return null;

  const response = await User.findOne({ userId }).select({ orders: 1 });

  return response;
};

export const UserServices = {
  postUserToDB,
  getAllUsersFromDB,
  getUserByIDFromDB,
  updateUserInDB,
  deleteUserFromDB,
  createOrderInDB,
  getAllOrdersOfUserFromDB,
  getUsersTotalOrderPriceFromDB,
};
