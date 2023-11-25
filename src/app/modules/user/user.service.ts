import { TOrder, TUpdateUser, TUser } from './user.interface';
import { User } from './user.model';

const postUserToDB = async (userData: TUser) => {
  const response = await User.create(userData);
  return response;
};

const getAllUsersFromDB = async () => {
  const response = await User.find({}).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });

  return response;
};

const getUserByIDFromDB = async (userId: number) => {
  if (isNaN(userId)) return null;

  const response = await User.userExists(userId);
  return response;
};

const updateUserInDB = async (userId: number, userData: TUpdateUser) => {
  if (isNaN(userId)) return null;

  const userExists: TUser | null = await User.userExists(userId);
  if (!userExists) return null;

  const response = await User.findOneAndUpdate(
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
  return response;
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

  // If orders field does not exist then create new orders field
  if (!userExists?.orders) {
    const response = await User.findOneAndUpdate(
      { userId },
      { $set: { orders: [orderData] } },
      { new: true, runValidators: true },
    );
    return response;
  }
  // If orders field already exist then push new order
  else {
    const response = await User.findOneAndUpdate(
      { userId },
      { $push: { orders: orderData } },
      { new: true, runValidators: true },
    );
    return response;
  }
};

const allOrdersOfUserFromDB = async (userId: number) => {
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

const totalPriceOfOrdersOfUserFromDB = async (userId: number) => {
  if (isNaN(userId)) return null;

  const userExists: TUser | null = await User.userExists(userId);
  if (!userExists) return null;

  const response = await User.aggregate([
    { $match: { userId } }, // Find the user
    { $unwind: '$orders' }, // Create a document for each order
    {
      $project: {
        totalPricePerOrder: {
          $multiply: ['$orders.price', '$orders.quantity'], // Calculate Each Order (price * quantity)
        },
      },
    },
    { $group: { _id: '$orders', totalPrice: { $sum: '$totalPricePerOrder' } } }, // Total Order
  ]);

  if (!response.length) return { totalPrice: 0 }; // If no orders send totalPrice 0
  return response[0];
};

export const UserServices = {
  postUserToDB,
  getAllUsersFromDB,
  getUserByIDFromDB,
  updateUserInDB,
  deleteUserFromDB,
  createOrderInDB,
  allOrdersOfUserFromDB,
  totalPriceOfOrdersOfUserFromDB,
};
