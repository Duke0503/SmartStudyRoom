import { User } from "./users.entity";
export declare class Schedule {
    ID: number;
    title: string;
    status: string;
    start_time: string;
    finish_time: string;
    date: Date;
    break_time: number;
    user: User;
}
