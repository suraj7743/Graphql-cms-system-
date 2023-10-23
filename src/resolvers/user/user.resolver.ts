import { USER_TYPE, User } from "../../entities/user/user.entity";
import { Context } from "../../types/context.types";
import { RegisterUserSchema } from "../../schemas/user/registerUser.schema";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import RequestValidator from "../../middlewares/requestValidator.middleware";
import { UserService } from "../../services/user/user.service";
import { RegisterUserInput } from "../../validator/user/registerUser.validator";
import authentication from "../../middlewares/auth.middleware";
import { MeSchema } from "../../schemas/user/me.schema";
import { ChangePasswordSchema } from "../../schemas/user/changePassword.schema";
import { ChangeUserPasswordInput } from "../../validator/user/changePassword.validator";
import { CommonResponseSchema } from "../../schemas/common/commonResponse.schema";
import { FinalizeProposalBidInput } from "../../validator/proposal/finalizeProposalBid.validator";
import { UserRoles } from "../../constants/enums/role.enum";

@Resolver()
export default class UserResolver {
  constructor(private readonly userService = new UserService()) {}

  @Mutation(() => RegisterUserSchema, {
    description: "Register new user",
  })
  @UseMiddleware(RequestValidator.validate(RegisterUserInput))
  async registerUser(@Arg("data") body: RegisterUserInput) {
    const response = await this.userService.create(body);

    return {
      message: "User Register Successfully",
      status: "success",
      ...response,
    };
  }

  @Query(() => MeSchema, {
    description: "Get user Info",
  })
  @UseMiddleware(authentication(true, [UserRoles.STUDENT]))
  async me(@Ctx() ctx: Context) {
    const ctxUser = ctx.user as User;
    const response = await this.userService.getUserInfo(ctxUser);
    console.log("response", response);
    return response;
  }

  @Mutation(() => ChangePasswordSchema, {})
  @UseMiddleware(RequestValidator.validate(ChangeUserPasswordInput))
  @UseMiddleware(authentication(true, [UserRoles.STUDENT]))
  async changePassword(
    @Arg("data") body: ChangeUserPasswordInput,
    @Ctx() ctx: Context
  ) {
    const ctxUser = ctx.user as User;
    const response = await this.userService.changePassword(body, ctxUser);
    // return response
    // return { oldPassword: "", newPassword: "", ...response };
    return {
      message: "Password changed successfully",
      status: "success",
      // ...response,
    };
  }
}
