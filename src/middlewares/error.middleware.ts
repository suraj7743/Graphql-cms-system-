import env from "../config/env.config";
import { Request, Response, NextFunction } from "express";
import Print from "../utils/Print";
import { Message } from "../constants/message.constant";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  Print.debug("Error Handler");

  Print.error(error);

  let statusCode = 500;

  let data = {
    success: false,
    message: Message["serverError"],
    data: [],
    ...(env.DEBUG_MODE == true && { originalError: error.message }),
  };
  if (error.isCustom) {
    statusCode = error.statusCode;
    data = {
      ...data,
      message: error.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
