import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/base.entity";
import Token from "../security/token.entity";
import { AdminRoles } from "../../constants/enums/role.enum";

@Entity({
  name: "admin",
})
export class Admin extends Base {
  @Column({
    name: "full_name",
    nullable: false,
  })
  fullName: string;

  @Column({
    name: "role",
    nullable: false,
    enum: AdminRoles,
  })
  role?: string;

  @Column({
    name: "email",
    unique: true,
  })
  email: string;

  @Column({
    name: "password",
  })
  password: string;

  @OneToMany(() => Token, (token) => token.user, {
    nullable: true,
  })
  tokens: Token[];
}
