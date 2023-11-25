import { Response } from 'express';

export default async (
  res: Response,
  error: any,
  code: number,
  message: string,
  description?: string,
) => {
  // Checking if error is a unique validation error
  if (error?.code === 11000) {
    res.status(403).json({
      success: false,
      message: `${Object.keys(error.keyPattern)[0]} must be unique.`,
      error: {
        code: 403,
        description: `${Object.keys(error.keyPattern)[0]} : ${
          Object.values(error.keyValue)[0]
        } already exists.`,
      },
    });
  } else {
    res.status(code).json({
      success: false,
      message: message,
      error: {
        code: code,
        description: error?.message ?? description,
      },
    });
  }
};
