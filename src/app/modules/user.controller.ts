import { Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';

import { UserServices } from './user.service';
import { TUser } from './user.interface';
import { userValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user: TUser = req.body;
    const zodParse = userValidationSchema.safeParse(user);

    if (!zodParse.success) {
      const err = fromZodError(zodParse.error);
      res.status(500).json({
        success: false,
        message: `${err.details[0].path} : ${err.details[0].message}`,
        error: err,
      });
    } else {
      const response = await UserServices.postUserToDB(zodParse.data);
      // const data = {...response}  as Partial<TUser>;
      // delete data.password

      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: response,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user!',
      error,
    });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get users!',
      error,
    });
  }
};

const getUserByID = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const response = await UserServices.getUserByIDFromDB(Number(userId));
    if (response) {
      const { orders, password, _id, ...data } = response?._doc;

      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: data,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserByID,
};
