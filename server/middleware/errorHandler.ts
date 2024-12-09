import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../constants';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: ERROR_MESSAGES.INVALID_INPUT,
      errors: err.errors,
    });
  }

  if (err.message === ERROR_MESSAGES.NOT_FOUND) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.message === ERROR_MESSAGES.UNAUTHORIZED) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: ERROR_MESSAGES.SERVER_ERROR,
  });
}