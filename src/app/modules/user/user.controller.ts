import { Request, Response } from 'express';

// Local Imports
import { UserServices } from './user.service';
import { TOrder, TUpdateUser, TUser } from './user.interface';
import {
  orderValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
} from './user.validation';
import {
  InternalServerError,
  UniqueFieldError,
  UserNotFound,
  ZodValidationError,
} from '../../../utils/ErrorHandle';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body;
    const zodParse = userValidationSchema.safeParse(user);

    if (!zodParse.success) {
      // Custom Error Handling function : ZodValidationError(res, zodParse)
      ZodValidationError(res, zodParse);
    } else {
      const response: any = await UserServices.postUserToDB(zodParse.data);
      delete response?._doc?.orders; // Delete order field from response

      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: response,
      });
    }
  } catch (error: any) {
    // Custom Unique Field Validation error handler
    if (error.code === 11000) UniqueFieldError(res, error);
    //Custom Internal Server Error handler
    else
      InternalServerError(res, error, 'There was an error creating new User');
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
    InternalServerError(res, error, 'There was an error fetching users.');
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
      // Custom User not found Error response function : UserNotFound(res, userId)
      UserNotFound(res, userId);
    }
  } catch (error: any) {
    InternalServerError(res, error, 'There was an error fetching user.');
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const userData: TUpdateUser = req.body;

    const zodParse = userUpdateValidationSchema.safeParse(userData);
    if (!zodParse.success) {
      ZodValidationError(res, zodParse);
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
        UserNotFound(res, userId);
      }
    }
  } catch (error: any) {
    if (error.code === 11000) UniqueFieldError(res, error);
    else
      InternalServerError(res, error, 'There was an error updating the User');
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
      UserNotFound(res, userId);
    }
  } catch (error) {
    InternalServerError(res, error, 'There was an error deleting the user.');
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const orderData: TOrder = req.body;

    const zodParse = orderValidationSchema.safeParse(orderData);

    if (!zodParse.success) {
      ZodValidationError(res, zodParse);
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
        UserNotFound(res, userId);
      }
    }
  } catch (error: any) {
    InternalServerError(res, error, 'There was an error creating order.');
  }
};

const getAllOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    const response = await UserServices.allOrdersOfUserFromDB(Number(userId));

    if (response) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: response,
      });
    } else {
      UserNotFound(res, userId);
    }
  } catch (error: any) {
    InternalServerError(
      res,
      error,
      "There was an error fetching user's orders.",
    );
  }
};

const getUsersTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const response = await UserServices.totalPriceOfOrdersOfUserFromDB(
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
      UserNotFound(res, userId);
    }
  } catch (error: any) {
    InternalServerError(
      res,
      error,
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
