import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/base.entity";
import Token from "../security/token.entity";
import { registerEnumType } from "type-graphql";
import { SetupValue } from "../../validator/data/dashboardDataInput.validator";
import { MediaInput } from "../../validator/media/media.validator";

export enum DataType {
  SETUP = "SETUP",
  LOGO = "LOGO",
}

@Entity("data")
export class DataEntity extends Base {
  @Column({ type: "enum", enum: DataType })
  typeValue: DataType;

  @Column({ type: "jsonb" || "string" })
  value: SetupValue;
}
