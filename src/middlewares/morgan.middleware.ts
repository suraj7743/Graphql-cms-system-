import morgan, { StreamOptions } from "morgan";
import dotenv from "../config/env.config";

import Logger from "../config/logger";
import { Environment } from "../constants/enums/environment";

const stream: StreamOptions = {
  write: (message: String) => Logger.http(message),
};

const skip = () => {
  const env = dotenv.NODE_ENV || Environment.DEVELOPMENT;
  return env !== Environment.DEVELOPMENT;
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
