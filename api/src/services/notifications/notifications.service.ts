import { Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { Notification } from 'src/entities/notifications.entity';
import { ExpoPushToken } from 'src/entities/ExpoPushToken.entity';
import { User } from 'src/entities/users.entity';
import { LessThan, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationDto } from 'src/common/dto/create-notification.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NotificationsService {
  private expo: Expo;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(ExpoPushToken)
    private readonly tokensRepository: Repository<ExpoPushToken>,    
  ) {
    this.expo = new Expo({ useFcmV1: true });
  }

  // Fetch Data
  async fetchNotifications(userId: number): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.find({
      where: {
        userID: userId,
        isReady: true,
        isSent: true,
      }
    });
    return notifications
  };
  // End Fetch Data

  // Create Expo Push Token
  async createExpoPushToken(token: string, userId: number): Promise<ExpoPushToken> {
    const user = await this.usersRepository.findOne({
      where: {ID: userId}
    });

    if (!user) {
      throw new Error('User not found');
    };

    const expoPushToken = this.tokensRepository.create({
      ExpoPushToken: token,
      userID: userId,
    });

    await this.tokensRepository.save(expoPushToken);

    return expoPushToken;
  }
  // End Create Expo Push Token


  // Update Expo Push Token
  async updateExpoPushToken(token: string, userId: number): Promise<ExpoPushToken> {
    const expoPushToken = await this.tokensRepository.findOne({
      where: { ExpoPushToken: token }
    })

    if (!expoPushToken)
      return this.createExpoPushToken(token, userId);

    if (expoPushToken.userID === userId) 
      return expoPushToken;

    const user = await this.usersRepository.findOne({
      where: {ID: userId}
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    expoPushToken.userID = userId;

    await this.tokensRepository.save(expoPushToken);

    return expoPushToken;
  }
  // End Update Expo Push Token
  
  // Create Notification
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const user = await this.usersRepository.findOne({
      where: {ID : createNotificationDto.userID}
    })
    if (!user) 
      throw new Error('User not found');

    const notification = this.notificationsRepository.create(createNotificationDto);
    
    await this.notificationsRepository.save(notification);

    return notification;
  }
  // End Create Notifcation

  // Delete Notification
  async deleteNotification(notificationId: number) {
    const notification = await this.notificationsRepository.findOne({
      where: {ID: notificationId}
    })

    if (!notification) throw Error("Notification not found");

    await this.notificationsRepository.remove(notification);
  }
  // End Delete Notification

  // Send Scheduled 
  @Cron('* * * * *')
  async sendScheuledNOtifications() {
    const now = new Date();
    const timeCondition = new Date(now.getTime() + 60000);

    // Take Notifications From Database
    const notifications = await this.notificationsRepository.find({
      where: {
        isSent: false,
        isReady: false,
        date: LessThan(timeCondition),
      },
    });

    // Create Messages to Send
    let messages = [];
    for (let notification of notifications) {
      let somePushTokens = await this.tokensRepository.find({
        where: {
          userID: notification.userID,
        },
      });

      for (let pushToken of somePushTokens) {
        if (!Expo.isExpoPushToken(pushToken.ExpoPushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          continue;
        }

        messages.push({
          to: pushToken.ExpoPushToken,
          title: notification.title,
          body: notification.content,
          sound: {
            name: 'default',
            critical: true,
            volume: 1.0,
          },
          data: { 
            url: 'Schedule', 
            notificationID: notification.ID, 
          }
        });        
      };

      notification.isReady = true;

      await this.notificationsRepository.save(notification);
    };

    // Send Notification
    let chunks = this.expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    for (let notification of notifications) {
      notification.isSent = true;
      await this.notificationsRepository.save(notification);
    };

  }
  // End Send Scheduled Notifications

  // Send Automatic Notification
  async sendAutomaticNotification(
    userId: number, 
    title: string, 
    message: string, 
  ) {
    const createNotificationDto = new CreateNotificationDto();
    createNotificationDto.userID = userId;
    createNotificationDto.content = message;
    createNotificationDto.title = title;
    createNotificationDto.date = new Date();
    createNotificationDto.isReady = true;
    createNotificationDto.isSent = false;
    createNotificationDto.scheduleID = null;

    const notification = await this.createNotification(createNotificationDto);

    let messages = [];
    
    let somePushTokens = await this.tokensRepository.find({
      where: {
        userID: notification.userID,
      },
    });

    for (let pushToken of somePushTokens) {
      if (!Expo.isExpoPushToken(pushToken.ExpoPushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      messages.push({
        to: pushToken.ExpoPushToken,
        title: notification.title,
        body: notification.content,
        sound: 'default',
        data: { url: 'Schedule', notificationID: notification.ID }
      });        
    };

    // Send Notification
    let chunks = this.expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    notification.isSent = true;
    await this.notificationsRepository.save(notification);
  };
  // End Send Automatic Notification
}




