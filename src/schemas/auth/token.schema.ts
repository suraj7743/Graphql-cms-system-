import { USER_TYPE } from "../../entities/user/user.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TokenSchema {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => USER_TYPE, { nullable: false })
  user_type: string;

  @Field(() => String, { nullable: false })
  iat: string;

  @Field(() => String, { nullable: false })
  exp: string;
}
