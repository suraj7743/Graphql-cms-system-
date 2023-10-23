import { USER_STATUS } from "../../entities/user/user.entity";
import { USER_TYPE } from "../../entities/user/user.entity";
import { Field, InputType, ObjectType } from "type-graphql";
import TResponse from "../../types/response.types";
import { BaseSchema } from "../base/base.schema";
import { Base } from "../../entities/base/base.entity";
import { CommonResponseSchema } from "../common/commonResponse.schema";
import { UserDetailsSchema } from "./registerUser.schema";
import { UDSchema } from "../admin/toBeApproveUser.schema";

@ObjectType()
export class MeSchema {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => USER_TYPE, { nullable: false })
  userType: string;

  @Field(() => UDSchema, { nullable: true })
  userDetails: UDSchema;
}

// @ObjectType()
// export class RegisterUserSchema extends TResponse(RegisterUser) {}
