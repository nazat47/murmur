import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  @Exclude()
  password!: string;

  @Column({ default: true })
  isActive!: boolean;
}
