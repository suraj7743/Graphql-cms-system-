import { Field, ObjectType } from "type-graphql";
import { DataType } from "../../entities/data/data.entity";
import { BaseSchema } from "../base/base.schema";

@ObjectType()
class SocialHandleResponse {
  @Field(() => String)
  facebook: string;

  @Field(() => String)
  youtube: string;
}
@ObjectType()
class MapResponse {
  @Field(() => String)
  latitude: string;

  @Field(() => String)
  longitude: string;
}

@ObjectType()
export class SetupValueResponse {
  @Field(() => String)
  name: string;

  @Field(() => [Number])
  contact: number[];

  @Field(() => [String])
  email: string[];

  @Field(() => String)
  location: string;

  @Field(() => Number)
  Est_year: number;

  @Field(() => String)
  slogan: string;

  @Field(() => MapResponse)
  map: MapResponse;

  @Field(() => SocialHandleResponse)
  social_handle: SocialHandleResponse;
}

// type LogoData {
//   name: String
//   type: String
//   mimeType: String
// }

@ObjectType()
export class SetupDataSchema extends BaseSchema {
  @Field(() => DataType)
  typeValue: DataType;

  @Field(() => SetupValueResponse)
  value: SetupValueResponse;
}

@ObjectType()
export class logoValueSchema {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  type: string;

  @Field(() => String, { nullable: true })
  mimeType: string;

  @Field(() => String, { nullable: true })
  path?: string;
}

@ObjectType()
export class SetupSchema {
  @Field(() => SetupDataSchema)
  setup: SetupDataSchema;

  @Field(() => String, { nullable: true })
  logoId: string;
}
