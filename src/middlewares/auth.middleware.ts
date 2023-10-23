import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/context.types";
import AppError from "../utils/errors/appError";
import AppDataSource from "../config/database.config";
import Token from "../entities/security/token.entity";
import { TokenStatus } from "../entities/security/token.entity";

const UNAUTHORIZED_MESSAGE = "You are not authorized to access this resource";

const authentication = (
  shouldThrowException = false,
  roles?: string[]
): MiddlewareFn<Context> => {
  return async ({ context }, next) => {
    const { req } = context;
    const { authorization } = req?.headers;

    if (!authorization && shouldThrowException) {
      throw AppError.BadRequest(UNAUTHORIZED_MESSAGE);
    }

    const data = authorization?.trim().split("Bearer");
    console.log("token", data);
    if (!data) throw AppError.BadRequest(UNAUTHORIZED_MESSAGE);

    if (data?.length !== 2 && shouldThrowException) {
      throw AppError.BadRequest(UNAUTHORIZED_MESSAGE);
    }

    const tokenRepo = AppDataSource.getRepository(Token);
    const token = await tokenRepo.findOne({
      where: {
        token: data[1].trim(),
        status: TokenStatus.ACTIVE,
      },
    });
    console.log("data 1", data[1].trim());
    console.log("Found in DB", token);

    try {
      if (token) {
        let parsedUser = JSON.parse(atob(token.token.split(".")[1]));
        console.log("parsedUser", parsedUser);

        if (roles) {
          if (!roles.includes(parsedUser.role))
            throw AppError.BadRequest(UNAUTHORIZED_MESSAGE);
        }

        context.user = parsedUser;
      } else {
        if (roles) throw AppError.BadRequest(UNAUTHORIZED_MESSAGE);
        context.user = undefined;
      }
      return next();
    } catch (err: any) {
      console.log("err", err);
      throw AppError.BadRequest(UNAUTHORIZED_MESSAGE);
    }
  };
};

export default authentication;
