import { Request, Response } from 'express';

import { UserServices } from './user.service';
import { TOrder, TUpdateUser, TUser } from './user.interface';
import {
  orderValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
} from './user.validation';
import ErrorHandle from '../../../utils/ErrorHandle';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body;
    const zodParse = userValidationSchema.safeParse(user);

    if (!zodParse.success) {
      const { code, message, path } = zodParse.error.issues[0];
      // Custom Error Handle Function ErrorHandle(res, error, code, message, description)
      ErrorHandle(
        res,
        null,
        403,
        'Validation Error!',
        `${code} ${path[0]}. ${message}`,
      );
    } else {
      const response: any = await UserServices.postUserToDB(zodParse.data);
      delete response?._doc?.orders;

      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: response,
      });
    }
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error!',
      'There was an error creating new User',
    );
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: response,
    });
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error.',
      'There was an error fetching users.',
    );
  }
};

const getUserByID = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;

    const response: any = await UserServices.getUserByIDFromDB(Number(userId));
    if (response) {
      delete response?._doc?.orders;
      delete response?._doc?._id;

      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: response,
      });
    } else {
      ErrorHandle(
        res,
        null,
        404,
        'User not found',
        `There is no user with userId: ${userId}.`,
      );
    }
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error.',
      'There was an error fetching user.',
    );
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const userData: TUpdateUser = req.body;

    const zodParse = userUpdateValidationSchema.safeParse(userData);
    if (!zodParse.success) {
      const { code, message, path } = zodParse.error.issues[0];

      ErrorHandle(
        res,
        null,
        403,
        'Validation Error!',
        `${code} ${path[0]}. ${message}`,
      );
    } else {
      const response = await UserServices.updateUserInDB(
        Number(userId),
        zodParse.data,
      );

      if (response) {
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: response,
        });
      } else {
        ErrorHandle(
          res,
          null,
          404,
          'User not found',
          `There is no user with userId: ${userId}.`,
        );
      }
    }
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error.',
      'There was an error updating user.',
    );
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const response = await UserServices.deleteUserFromDB(Number(userId));

    if (response?.deletedCount === 1) {
      res.json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      ErrorHandle(
        res,
        null,
        404,
        'User not found',
        `There is no user with userId: ${userId}.`,
      );
    }
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error.',
      'There was an error deleting the user.',
    );
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const orderData: TOrder = req.body;

    const zodParse = orderValidationSchema.safeParse(orderData);

    if (!zodParse.success) {
      const { code, message, path } = zodParse.error.issues[0];

      ErrorHandle(
        res,
        null,
        403,
        'Validation Error!',
        `${code} ${path[0]}. ${message}`,
      );
    } else {
      const response = await UserServices.createOrderInDB(
        Number(userId),
        zodParse.data,
      );

      if (response) {
        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: null,
        });
      } else {
        ErrorHandle(
          res,
          null,
          404,
          'User not found',
          `There is no user with userId: ${userId}.`,
        );
      }
    }
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error.',
      'There was an error creating order.',
    );
  }
};

const getAllOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const response = await UserServices.getAllOrdersOfUserFromDB(
      Number(userId),
    );

    if (response) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: response,
      });
    } else {
      ErrorHandle(
        res,
        null,
        404,
        'User not found',
        `There is no user with userId: ${userId}.`,
      );
    }
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error.',
      "There was an error fetching user's orders.",
    );
  }
};

const getUsersTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await UserServices.getTotalPriceOfAllOrdersOfUserFromDB(
      Number(userId),
    );

    if (response) {
      delete response?._id;
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: response,
      });
    } else {
      ErrorHandle(
        res,
        null,
        404,
        'User not found',
        `There is no user with userId: ${userId}.`,
      );
    }
  } catch (error: any) {
    ErrorHandle(
      res,
      error,
      500,
      'Internal Server Error.',
      'There was an error calculating total price.',
    );
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrdersOfUser,
  getUsersTotalOrderPrice,
};
