import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Murmur } from "./murmur.entity";
import { User } from "./user.entity";

@Entity()
export class Timeline {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Murmur, { eager: true, onDelete: "CASCADE" })
  murmur: Murmur;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
