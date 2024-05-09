import{Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import{User} from "./users.entity";

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