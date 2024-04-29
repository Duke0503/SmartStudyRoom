import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('Devices')

export class Device {

  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_ID" })
  user: User;

  @Column()
  type: string;

  @Column({ nullable: true })
  cond_data: number;

  @Column({ nullable: true })
  light_data: number;
}