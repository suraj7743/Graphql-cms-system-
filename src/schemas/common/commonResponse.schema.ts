import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CommonResponseSchema {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  status: string;
}
