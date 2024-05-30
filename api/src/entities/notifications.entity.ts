import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./users.entity";
import { Schedule } from "./schedules.entity";

@Entity('Notifications')

export class Notification {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  title: string;

  @Column({})
  content: string;

  @Column({ default: false })
  isReady: boolean;

  @Column({ default: false })
  isSent: boolean;

  @Column()
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_ID" })
  userID: number; 

  @ManyToOne(() => Schedule, { nullable: true })
  @JoinColumn({ name: "schedule_ID" })
  schedule_ID: number; 
}