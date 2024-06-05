import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
  BeforeInsert, 
  BeforeUpdate,
  CreateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import * as bcrypt from 'bcrypt'
import { Sensor } from "./sensors.entity";

@Entity('Users') 

export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  roles: string

  @Column({ nullable: true })
  supervisor: string;

  @Column({ default: false, nullable: true })
  isVerified: boolean;

  @Column({ nullable: true })
  emailToken: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  gender: string;

  @Column()
  @CreateDateColumn()
  timestamp: Date;
  
  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;
  
}