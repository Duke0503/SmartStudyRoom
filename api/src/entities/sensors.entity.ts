import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('Sensors')

export class Sensor {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  sound_data: string;

  @Column({ nullable: true })
  temp_data: string;

  @Column({ nullable: true })
  light_data: string;

  @Column({ nullable: true })
  camera_data: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_ID" })
  user: User;  
}