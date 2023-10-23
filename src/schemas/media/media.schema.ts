import { Field, ObjectType } from "type-graphql";
import { BaseSchema } from "../base/base.schema";

@ObjectType()
export class MediaSchema extends BaseSchema {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  mimeType: string;

  @Field({
    nullable: true,
  })
  path?: string;
}

export default MediaSchema;
