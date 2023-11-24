import { Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';

import { UserServices } from './user.service';
import { TOrder, TUpdateUser, TUser } from './user.interface';
import {
  orderValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body;
    const zodParse = userValidationSchema.safeParse(user);

    if (!zodParse.success) {
      const err = fromZodError(zodParse.error);
      res.status(403).json({
        success: false,
        message: 'Validation Error!',
        error: {
          code: 403,
          description: `${err.details[0].path} : ${err.details[0].message}`,
        },
      });
    } else {
      const response = await UserServices.postUserToDB(zodParse.data);

      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: response,
      });
    }
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(500).json({
        success: false,
        message: `${Object.keys(error.keyPattern)[0]} must be unique.`,
        error: {
          code: 500,
          description: `${Object.keys(error.keyPattern)[0]} : ${
            Object.values(error.keyValue)[0]
          } already exists.`,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
        error: {
          code: 500,
          description:
            error?.message ?? 'There was an error creating new user.',
        },
      });
    }
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
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: {
        code: 500,
        description: error?.message ?? 'There was an error fetching users.',
      },
    });
  }
};

const getUserByID = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;

    const response: any = await UserServices.getUserByIDFromDB(Number(userId));
    if (response) {
      delete response?._doc.orders;

      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: response,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: {
        code: 500,
        description: error?.message ?? 'There was an error fetching user.',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const userData: TUpdateUser = req.body;

    const zodParse = userUpdateValidationSchema.safeParse(userData);
    if (!zodParse.success) {
      const err = fromZodError(zodParse.error);
      res.status(403).json({
        success: false,
        message: 'Validation Error!',
        error: {
          code: 403,
          description: `${err.details[0].path} : ${err.details[0].message}`,
        },
      });
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
        res.status(404).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: {
        code: 500,
        description: error?.message ?? 'There was an error updating user.',
      },
    });
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
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: {
        code: 500,
        description: error?.message ?? 'There was an error deleting the user.',
      },
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const orderData: TOrder = req.body;

    const zodParse = orderValidationSchema.safeParse(orderData);
    if (!zodParse.success) {
      const err = fromZodError(zodParse.error);
      res.status(403).json({
        success: false,
        message: 'Validation Error!',
        error: {
          code: 403,
          description: `${err.details[0].path} : ${err.details[0].message}`,
        },
      });
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
        res.status(404).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: {
        code: 500,
        description: error?.message ?? 'There was an error creating order.',
      },
    });
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
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: {
        code: 500,
        description:
          error?.message ?? "There was an error fetching user's orders.",
      },
    });
  }
};

const getUsersTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await UserServices.getAllOrdersOfUserFromDB(
      Number(userId),
    );

    if (response) {
      const totalPrice = response?.orders?.reduce(
        (prev, next: TOrder) => prev + next.price * next.quantity,
        0,
      );
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: { totalPrice },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: {
        code: 500,
        description:
          error?.message ?? 'There was an error calculating total price.',
      },
    });
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
