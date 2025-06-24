import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.followers, {
    eager: true,
    onDelete: "CASCADE",
  })
  followedUser: User;

  @ManyToOne(() => User, (user) => user.following, {
    eager: true,
    onDelete: "CASCADE",
  })
  followedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
