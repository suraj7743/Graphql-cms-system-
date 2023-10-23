import express, { Application } from "express";
import errorHandler from "./error.middleware";
import morganMiddleware from "./morgan.middleware";
import path from "path";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

const middlewares = (app: Application) => {
  app.use(compression());

  app.use(cors());

  app.use(express.json());

  app.use(morganMiddleware);

  app.use(express.static("public/"));

  app.use(errorHandler);
};

export default middlewares;
