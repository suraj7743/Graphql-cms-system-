import {
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Field, InputType, registerEnumType } from "type-graphql";
import { DataType } from "../../entities/data/data.entity";
import { Type } from "class-transformer";

@InputType()
class SocialHandle {
  @Field(() => String)
  @MinLength(2)
  @IsOptional()
  facebook: string;

  @Field(() => String)
  @MinLength(2)
  @IsOptional()
  youtube: string;
}

@InputType()
class MapInput {
  @Field(() => String)
  @MinLength(2)
  @IsOptional()
  longitude: string;

  @Field(() => String)
  @MinLength(2)
  @IsOptional()
  latitude: string;
}

@InputType()
export class SetupValue {
  @Field(() => String)
  @MinLength(2)
  name: string;

  @Field(() => [Number])
  @IsNotEmpty()
  contact: number[];

  @Field(() => [String])
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsEmail({}, { message: "must be an valid email", each: true })
  email: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  location: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  Est_year: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  slogan: string;

  @Field(() => MapInput)
  @Type(() => MapInput)
  @IsOptional()
  map: MapInput;

  @Field(() => SocialHandle)
  @Type(() => SocialHandle)
  @IsOptional()
  social_handle: SocialHandle;
}

@ValidatorConstraint({ name: "string-or-number", async: false })
export class IsSetupValue implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    return text === DataType.SETUP;
  }

  defaultMessage(args: ValidationArguments) {
    return `typeValue should be SETUP type only`;
  }
}

@InputType()
export class DashboardDataInput {
  @Field(() => DataType)
  @IsNotEmpty()
  @Validate(IsSetupValue)
  // @IsIn(["SETUP"], { message: "Should be setup type only" })
  typeValue: DataType.SETUP;

  @Field(() => SetupValue)
  @ValidateNested({ each: true })
  @Type(() => SetupValue)
  value: SetupValue;
}
