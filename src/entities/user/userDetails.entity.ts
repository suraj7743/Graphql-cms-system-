import { Base } from "../base/base.entity";
import { MediaEntity as Media } from "../media/media.entity";
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "user_details" })
export class UserDetailsEntity extends Base {
  @Column({
    name: "first_name",
  })
  firstName: string;

  @Column({
    name: "middle_name",
    nullable: true,
  })
  middleName?: string;

  @Column({
    name: "last_name",
  })
  lastName: string;

  @Column({ name: "prior_investment", nullable: true, type: "text" })
  priorInvestment?: string;

  @Column({ name: "profile_image_id", nullable: true, type: "varchar" })
  profileImage: string;

  @Column({ name: "citizenship_id", nullable: true, type: "varchar" })
  citizenshipImage: string;

  // @ManyToMany(() => Media, (media) => media.userDetails, {
  //   onDelete: "CASCADE",
  // })
  // media_id: Media[];

  @OneToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
