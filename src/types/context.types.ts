import { Request, Response } from "express";
import { Admin } from "../entities/admin/admin.entity";
import { User } from "../entities/user/user.entity";
import { TokenSchema } from "../schemas/auth/token.schema";

export interface Context {
  req: Request;
  res: Response;
  user?: User | Admin | TokenSchema;
  token?: string;
}
