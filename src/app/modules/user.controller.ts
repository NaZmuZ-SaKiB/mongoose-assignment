import { Request, Response } from 'express';
import { fromZodError } from 'zod-validation-error';

import { UserServices } from './user.service';
import { TUser } from './user.interface';
import { userValidationSchema } from './user.validation';
import { ZodError } from 'zod';

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
      message: error?.message || 'Failed to create user!',
      error,
    });
  }
};

export const UserControllers = {
  createUser,
};
