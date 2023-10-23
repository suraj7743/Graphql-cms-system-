import { registerEnumType } from "type-graphql";
import { Column, Entity, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Base } from "../base/base.entity";
import { UserDetailsEntity } from "./userDetails.entity";
import Token from "../security/token.entity";

export enum USER_TYPE {
  INVESTOR = "INVESTOR",
  ENTREPRENEUR = "ENTREPRENEUR",
}

registerEnumType(USER_TYPE, {
  name: "user_type",
  description: "Type of user",
});

export enum USER_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive", // For deleted user.
  UNDER_REVIEW = "under_review",
  REJECTED = "rejected",
}

@Entity({
  name: "user",
})
export class User extends Base {
  @Column({
    name: "email",
    unique: true,
  })
  email: string;

  @Column({
    name: "password",
  })
  password: string;

  @Column({ name: "user_type", type: "enum", enum: USER_TYPE })
  userType: USER_TYPE;

  @Column({
    name: "user_status",
    type: "enum",
    enum: USER_STATUS,
    default: USER_STATUS.UNDER_REVIEW,
  })
  userStatus: USER_STATUS;

  @OneToOne(() => UserDetailsEntity, (userDetails) => userDetails.user, {
    cascade: true,
  })
  userDetails: UserDetailsEntity;

  @OneToMany(() => Token, (token) => token.user, {
    cascade: true,
    nullable: true,
  })
  tokens: Token[];
}
