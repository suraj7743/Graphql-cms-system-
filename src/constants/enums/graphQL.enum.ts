import { registerEnumType } from "type-graphql";
import { DataType } from "../../entities/data/data.entity";
import { AdminRoles, UserRoles } from "./role.enum";

export enum GraphQlErrorCode {
  GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED", //The GraphQL operation string contains a syntax error.
  GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED", //The GraphQL operation is not valid against the server's schema.
  BAD_USER_INPUT = "BAD_USER_INPUT", //The user input is invalid.
  UNAUTHENTICATED = "UNAUTHENTICATED", //The user is not authenticated.
  UNAUTHORIZED = "UNAUTHORIZED", //The user is not authorized.
  FORBIDDEN = "FORBIDDEN", //The user is not authorized.
  PERSISTED_QUERY_NOT_FOUND = "PERSISTED_QUERY_NOT_FOUND", //The persisted query was not found.
  PERSISTED_QUERY_NOT_SUPPORTED = "PERSISTED_QUERY_NOT_SUPPORTED", //The persisted query is not supported.
  BAD_REQUEST = "BAD_REQUEST", //The user input is invalid.
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR", //The server encountered an internal error and was unable to complete your request.
}

// *This message is thrown there is a validation error
export enum GraphQLErrorMessage {
  GRAPHQL_VALIDATION_ERROR = "Argument Validation Error",
}

export enum status {
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  NEW = "NEW",
  ON_PROGRESS = "ON_PROGRESS",
}

export enum AcceptReject {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  IDLE = "IDLE",
}

registerEnumType(status, {
  name: "status",
  description: "status",
});

registerEnumType(AcceptReject, {
  name: "acceptReject",
  description: "Accept Reject",
});

registerEnumType(AdminRoles, {
  name: "adminRoles",
});

registerEnumType(UserRoles, {
  name: "userRoles",
});

export enum MediaType {
  PROPOSAL = "PROPOSAL",
  USER_AVATAR = "user_avatar",
  USER_DOCUMENT = "USER_DOCUMENT",
  LOGO = "LOGO",
}
registerEnumType(MediaType, {
  name: "Media_type",
  description: "media type",
});

registerEnumType(DataType, {
  name: "DataType", // Mandatory
  description: "Enum for data type", // Optional
});

export type MultiLanguage = {
  en: string;
  ne: string;
};
