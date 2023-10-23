import { Field, ObjectType } from "type-graphql";

@ObjectType()
class UserLoginSchema {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@ObjectType()
export class LoginUserSchema {
  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  status: string;

  @Field(() => UserLoginSchema)
  user: UserLoginSchema;
}
