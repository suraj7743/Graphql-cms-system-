import { CommonResponseSchema } from "../common/commonResponse.schema";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ChangePasswordSchema extends CommonResponseSchema {
  @Field(() => String, { nullable: true })
  oldPassword: string;

  @Field(() => String, { nullable: true })
  newPassword: string;
}
