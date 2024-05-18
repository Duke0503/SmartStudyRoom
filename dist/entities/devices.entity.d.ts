import { User } from "./users.entity";
export declare class Device {
    ID: number;
    name: string;
    status: string;
    user: User;
    type: string;
    cond_data: number;
    light_data: number;
}
