import DotenvConfiguration from "../config/env.config";

export enum STATUS {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}

export const createdMessage = (title: string) => {
  return `${title} created successfully`;
};
export const updatedMessage = (title: string) => {
  return `${title} updated successfully`;
};

export const deletedMessage = (title: string) => {
  return `${title} deleted successfully`;
};

export const Message = {
  APP_CREATED: (port: number) =>
    `${DotenvConfiguration.APP_NAME} is running on http://localhost:${port}`,

  DB_CONNECTION_SUCCESS: "Database connection successful",
  DB_CONNECTION_FAIL: "Database connection failed",

  INTERNAL_SERVER_ERROR: "Something went wrong",

  EMAIL_NOT_SENT_ERROR: "Email not sent",
  INVALID_EMAIL_OR_PASSWORD_ERROR: "invalid email or password",
  PASSWORD_AND_CONFIRM_PASSWORD_MISMATCH_ERROR:
    "password and confirm password mismatch",

  // Email Messages.
  EMAIL_SENT_SUCCESS: "Email sent successfully",
  INVALID_EMAIL: "Invalid email",
  INVALID_INPUT: "Invalid input",
  PASSWORD_NOT_MATCH: "Password not Match",
  DATA_NOT_FOUND: "Data Not Found",
  DATA_DELETED_SUCCESSFULLY: "Data deleted successfully",
  DATA_ADD_SUCCESSFULLY: "Data add successfully",

  serverError: "Internal Server Error",
  invalidCredentials: "Invalid Credentials",
  invalidToken: "Invalid Token",
  tokenExpired: "Token Expired",
  invalidEmail: "Invalid Email",
  emailAlreadyExists: "Email Already Exists",
  invalidPassword: "Invalid Password",
  welcomeMessage: "Welcome to the ######## API",
  dataFetched: "Data Fetched Successfully",
  dataUpdated: "Data Updated Successfully",
  dataInserted: "Data Inserted Successfully",
  dataDeleted: "Data Deleted Successfully",
  adminCreated: "Admin Created Successfully",
  userCreated: "User Created Successfully",
  passwordStrength:
    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
  invalidAuth: "Invalid email or password",
  validLogin: "Logged in Successfully",
  unAuthorized: "You are not authorized to perform this action",
  mediaUploaded: "Media Uploaded Successfully",
  invalidContactNumber: "Invalid Contact Number",
  invalidProjectId: "Invalid Project",
  actionCompleted: "Action completed successfully",
  contactNumberExist: "Contact Number Already Exist",
};
