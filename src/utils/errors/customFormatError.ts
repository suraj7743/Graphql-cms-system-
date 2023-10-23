import { GraphQLFormattedError } from "graphql";
import {
  GraphQlErrorCode,
  GraphQLErrorMessage,
} from "../../constants/enums/graphQL.enum";
import handleValidationError from "./validationError";

export const handleCustomError = (err: GraphQLFormattedError) => {
  return {
    success: false,
    code: err.extensions?.code,
    message: err.message,
    errors: [{ message: err.message }],
  };
};

const customFormatError = (err: GraphQLFormattedError) => {
  switch (err.extensions?.code) {
    case GraphQlErrorCode.INTERNAL_SERVER_ERROR:
      if (err.message == GraphQLErrorMessage.GRAPHQL_VALIDATION_ERROR) {
        return handleValidationError(err);
      } else {
        return {
          success: false,
          code: "BAD_REQUEST" || err.extensions.code,
          message: err.message,
        };
      }
    case GraphQlErrorCode.BAD_USER_INPUT:
      return err.message;

    default:
      console.log(err);
      // *Check if the error is a custom error which are thrown intentionally
      // @ts-ignore
      if (err?.extensions?.exception?.isOperational) {
        return handleCustomError(err);
      } else {
        return {
          success: false,
          code: err.extensions?.code,
          message:
            "Internal Server Error. Either check your input or try again later.",
          errors: [],
        };
      }
  }
};

export default customFormatError;
