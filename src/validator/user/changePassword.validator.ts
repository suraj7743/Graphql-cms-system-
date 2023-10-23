import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ChangeUserPasswordInput {
  @Field(() => String, { nullable: false })
  @IsString()
  oldPassword: string;

  @Field(() => String, { nullable: false })
  @IsString()
  newPassword: string;
}
