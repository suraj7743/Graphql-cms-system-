import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AdminLoginSchemaResponse {
  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => String, { nullable: true })
  message: string;
}
