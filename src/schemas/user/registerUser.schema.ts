import { USER_STATUS } from "../../entities/user/user.entity";
import { USER_TYPE } from "../../entities/user/user.entity";
import { Field, InputType, ObjectType } from "type-graphql";
import TResponse from "../../types/response.types";
import { BaseSchema } from "../base/base.schema";
import { Base } from "../../entities/base/base.entity";
import { CommonResponseSchema } from "../common/commonResponse.schema";
import { MediaEntity as Media } from "../../entities/media/media.entity";
import MediaSchema from "../media/media.schema";

@ObjectType()
export class UserDetailsSchema extends BaseSchema {
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: true })
  middleName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => [MediaSchema], { nullable: true })
  media: string[];
}

@ObjectType()
export class RegisterUserSchema extends CommonResponseSchema {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => USER_TYPE, { nullable: false })
  userType: string;

  @Field(() => UserDetailsSchema, { nullable: false })
  userDetails: UserDetailsSchema;
}

// @ObjectType()
// export class RegisterUserSchema extends TResponse(RegisterUser) {}
