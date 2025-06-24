import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Murmur {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 100,
  })
  title: string;

  @Column({
    nullable: false,
    type: "text",
  })
  content: string;

  @ManyToOne(() => User, (user) => user.murmurs, {
    eager: true,
    onDelete: "CASCADE",
  })
  author: User;

  @ManyToMany(() => User, { cascade: true, eager: true })
  @JoinTable()
  likedBy: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
