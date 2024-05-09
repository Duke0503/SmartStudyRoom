import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
// import{User} from "./users.entity";

@Entity('Users') 
export class User {
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    roles: string
  
    @Column({ nullable: true })
    supervisor: string;
    
}

@Entity('Notifications')
export class Notification{
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    content: string;

    @Column()
    title: string;

    @Column()
    isRead: boolean;

    @Column()
    date: Date;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_ID" })
    user: User;
}

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

  @Column()
  date: Date;

  @Column({ nullable: true })
  break_time: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_ID" })
  user: User;
}
