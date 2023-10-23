import { GraphQLFormattedError } from "graphql";

type SanitizeError = {
  message: string;
  field: string;
  value: string;
};

const handleValidationError = (err: GraphQLFormattedError) => {
  // @ts-ignore
  const errors = err?.extensions?.exception?.validationErrors;

  let sanitizedError: SanitizeError[] = errors?.map((error: any) => {
    return {
      message: error.constraints[Object.keys(error.constraints)[0]],
      field: error.property,
      value: error.value,
    };
  });
  return {
    success: false,
    code: err.extensions?.code,
    message: err.message,
    errors: sanitizedError,
  };
};

export default handleValidationError;
