import { Field, ObjectType } from "type-graphql";
import TResponse from "../../types/response.types";
@ObjectType()
export class User {
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  middleName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  email: string;
}
@ObjectType()
export class UserSchema extends TResponse(User) {}
