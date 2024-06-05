import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('Schedules')

export class Schedule {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  start_time: Date;

  @Column()
  finish_time: Date;

  @Column({ nullable: true })
  break_time: number;

  @Column({ nullable: true })
  sensor_ID: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_ID" })
  user: User;
}