import { User } from "./users.entity";
export declare class Notification {
    ID: number;
    name: string;
    code: string;
    content: string;
    title: string;
    isRead: boolean;
    date: Date;
    user: User;
}
