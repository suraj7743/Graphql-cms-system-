import { Middlewares } from "tsoa";
import { LoginUserSchema } from "../../schemas/user/loginUser.schema";
import { Arg, Mutation, Resolver } from "type-graphql";
import RequestValidator from "../../middlewares/requestValidator.middleware";
import { validate } from "class-validator";
import { LoginUserInput } from "../../validator/auth/loginUser.validator";
import { AuthService } from "../../services/auth/auth.service";
import JWTUtil from "../../utils/jwt.util";
import DotenvConfiguration from "../../config/env.config";
import { AdminLoginSchemaResponse } from "../../schemas/admin/adminLogin.schema";

@Resolver()
export default class AuthResolver {
  constructor(private readonly authService = new AuthService()) {}

  @Mutation(() => LoginUserSchema)
  @Middlewares(() => RequestValidator.validate(LoginUserInput))
  async loginUser(@Arg("data") body: LoginUserInput) {
    const { user, token } = await this.authService.loginUser(body);
    console.log("user", user);
    return {
      token,
      status: "success",
      message: "Login Successful",
      user: user,
    };
  }

  @Mutation(() => AdminLoginSchemaResponse)
  @Middlewares(() => RequestValidator.validate(LoginUserInput))
  async loginAdmin(@Arg("data") body: LoginUserInput) {
    const { admin, token } = await this.authService.loginAdmin(body);
    console.log("user", admin);
    return {
      token,
      status: "success",
      message: "Login Successful",
      user: admin,
    };
  }

  async logoutUser() {}
}
