import { Response } from 'express';

export const UniqueFieldError = async (res: Response, error: any) => {
  res.status(403).json({
    success: false,
    message: `${Object.keys(error?.keyPattern)[0]} must be unique.`,
    error: {
      code: 403,
      description: `${Object.keys(error?.keyPattern)[0]} : ${
        Object.values(error?.keyValue)[0]
      } already exists.`,
    },
  });
};

export const InternalServerError = async (
  res: Response,
  error: any,
  message: string,
) => {
  res.status(500).json({
    success: false,
    message: message,
    error: {
      code: 500,
      description: error?.message ?? message,
    },
  });
};

export const UserNotFound = async (res: Response, userId?: number | string) => {
  res.status(404).json({
    success: false,
    message: 'User not found',
    error: {
      code: 404,
      description: `There is no user with given userId: ${userId ?? ''}.`,
    },
  });
};

export const ZodValidationError = async (res: Response, zodParse: any) => {
  const { code, message, path } = zodParse?.error?.issues[0] as any;
  res.status(403).json({
    success: false,
    message: 'Validation Error!',
    error: {
      code: 403,
      description: `${code} ${path[0]}. ${message}`,
    },
  });
};
