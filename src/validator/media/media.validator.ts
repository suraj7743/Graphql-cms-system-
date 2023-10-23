import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { MediaType } from "../../constants/enums/graphQL.enum";
import { Field, InputType } from "type-graphql";

@InputType()
export class MediaInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  mimeType: string;

  @Field(() => MediaType)
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;
}
