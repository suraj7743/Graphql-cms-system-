import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export abstract class BaseSchema {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;
}
