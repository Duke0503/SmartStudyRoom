import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users') 

export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  supervisor_id: number;

  @Column()
  type: string
}