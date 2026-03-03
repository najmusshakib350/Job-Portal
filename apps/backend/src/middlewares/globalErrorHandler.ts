import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { env } from "../config/env";

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  if (env.nodeEnv === "development") {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.isOperational
        ? err.message
        : "Something went wrong. Please try again later.",
    });
  }
};
