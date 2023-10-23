import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { USER_TYPE } from "../../entities/user/user.entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  middleName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password is  too weak",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => USER_TYPE)
  @IsEnum(USER_TYPE)
  userType: USER_TYPE;

  @Field()
  @IsString()
  @IsNotEmpty()
  media_id: string;
}
