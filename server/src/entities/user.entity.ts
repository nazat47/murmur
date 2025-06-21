import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Murmur } from "./murmur.entity";

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

  @OneToMany(() => Murmur, (murmur) => murmur.author)
  murmurs: Murmur[];
}
