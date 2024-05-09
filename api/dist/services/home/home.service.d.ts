import { Notification } from 'src/entities/home.entity';
import { Repository } from 'typeorm';
export declare class HomeService {
    private readonly notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    getAllNotifications(): Promise<Notification[]>;
}
