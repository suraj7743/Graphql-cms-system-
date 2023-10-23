import { STATUS } from "../../constants/message.constant";
import { StatusCodes } from "http-status-codes";

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? STATUS.FAIL : STATUS.ERROR;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static NotFound(message: string) {
    return new AppError(message, StatusCodes.NOT_FOUND);
  }
  static InternalServer(message: string) {
    return new AppError(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  static BadRequest(message: string) {
    return new AppError(message, StatusCodes.BAD_REQUEST);
  }

  static Unauthorized(message: string) {
    return new AppError(message, StatusCodes.UNAUTHORIZED);
  }

  static Forbidden(message: string) {
    return new AppError(message, StatusCodes.FORBIDDEN);
  }
  static ValidationFailed(message: string) {
    return new AppError(message, StatusCodes.BAD_REQUEST);
  }
}

export default AppError;
