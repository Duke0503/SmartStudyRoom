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
  start_time: string;

  @Column()
  finish_time: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ nullable: true })
  break_time: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_ID" })
  user: User;
}