import { AcceptReject } from "../../constants/enums/graphQL.enum";
import { USER_STATUS } from "../../entities/user/user.entity";
import { Context } from "../../types/context.types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import authentication from "../../middlewares/auth.middleware";
import { AdminRoles } from "../../constants/enums/role.enum";
import { CommonResponseSchema } from "../../schemas/common/commonResponse.schema";
import { AdminService } from "../../services/admin/admin.service";
import { ToBeApprovedUserSchema } from "../../schemas/admin/toBeApproveUser.schema";

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService = new AdminService()) {}

  @Query(() => [ToBeApprovedUserSchema], {
    description: "List of users to be approved",
  })
  //   @UseMiddleware(authentication(true, [Role.ADMIN]))
  async toBeVerifiedUserList(@Ctx() ctx: Context) {
    // const ctxUser = ctx.user as User;
    const response = await this.adminService.getToBeApprovedUserList();
    console.log("response ", response);
    return response;
  }

  //   @Mutation(() => ChangePasswordSchema, {})
  //   @UseMiddleware(RequestValidator.validate(ChangeUserPasswordInput))
  //   @UseMiddleware(authentication(true, [Role.USER]))
  //   async changePassword(
  //     @Arg("data") body: ChangeUserPasswordInput,
  //     @Ctx() ctx: Context
  //   ) {
  //     const ctxUser = ctx.user as User;
  //     const response = await this.userService.changePassword(body, ctxUser);
  //     // return response
  //     // return { oldPassword: "", newPassword: "", ...response };
  //     return {
  //       message: "Password changed successfully",
  //       status: "success",
  //       // ...response,
  //     };
  //   }
}
