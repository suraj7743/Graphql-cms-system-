import { Context } from "../types/context.types";
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { MiddlewareFn } from "type-graphql";
import AppError from "../utils/errors/appError";
// import Context from "../types/context.type";

export default class RequestValidator {
  static async getValidationMessage(
    errors: ValidationError[],
    message: string[]
  ) {
    errors.forEach(async (err) => {
      if (err.children && err.children?.length > 0) {
        await this.getValidationMessage(err.children, message);
      } else {
        if (err.constraints) {
          Object.values(err.constraints).forEach((value) => {
            message.push(value);
          });
        }
        return;
      }
    });
  }
  static validate = <T extends object>(
    classInstance: ClassConstructor<T>
  ): MiddlewareFn<Context> => {
    return async ({ context }, next) => {
      const { req } = context;
      // *Convert body to class instance
      const convertedObject = plainToClass(
        classInstance,
        req.body.variables.data
      ); // *Validate the class instance

      let validationMessages: string[] = [];
      const errors = await validate(convertedObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length !== 0) {
        await this.getValidationMessage(errors, validationMessages);
        throw AppError.BadRequest(validationMessages[0]);
      }
      return await next();
    };
  };
}
