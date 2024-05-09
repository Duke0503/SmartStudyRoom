import { User } from "./users.entity";
export declare class Sensor {
    ID: number;
    name: string;
    type: string;
    sound_data: string;
    temp_data: string;
    light_data: string;
    camera_data: string;
    user: User;
}
