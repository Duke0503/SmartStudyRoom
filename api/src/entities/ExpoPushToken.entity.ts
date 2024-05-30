import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('ExpoPushToken')

export class ExpoPushToken {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  ExpoPushToken: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_ID" })
  userID: number; 
}