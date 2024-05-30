import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./users.entity";

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
  // user: User; 
  userID: number; 
}