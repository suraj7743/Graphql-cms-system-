import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginUserInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  password: string;
}
