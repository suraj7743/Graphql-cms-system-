import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Admin } from "../admin/admin.entity";
import { User } from "../user/user.entity";
import { Base } from "../base/base.entity";

export enum TokenStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity()
class Token extends Base {
  @ManyToOne(() => User, (user) => user.tokens, {
    nullable: true,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Admin, (admin) => admin.tokens, {
    nullable: true,
    onDelete: "CASCADE",
  })
  admin: Admin;

  @Column({
    type: "text",
  })
  token: string;

  @Column({
    type: "enum",
    enum: TokenStatus,
  })
  status: TokenStatus;

  @Column({})
  expiresAt: Date;
}

export default Token;
