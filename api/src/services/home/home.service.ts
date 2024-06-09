import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from 'src/entities/notifications.entity';
import { Schedule } from 'src/entities/schedules.entity';
import { Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { addManagedUserDto } from 'src/common/dto/add-managed-user.dto';
import { User } from 'src/entities/users.entity';
import { UsersService } from '../users/users.service';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config'
import { isTokenExpired } from 'src/common/utils/dateTimeUltility';


@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) { }

    async addManagedUser(addManagedUserDto: addManagedUserDto, user_id: number): Promise<User> {
        const { email } = addManagedUserDto;
        const user = await this.usersService.findByEmail(email);

        if (!user || !user.isVerified) {
            throw new NotFoundException('Account not found');
        }
        if (user.roles !== "user") {
            throw new ConflictException('Account is not a user');
        }
        if (user.supervisorID) {
            if(user.supervisorID === user_id) {
                throw new ConflictException('Account was already added');
            } else {
                throw new ConflictException('Account was already added to another supervisor');
              }
        }
        return user;
    }

    // Mail Transport
    mailTransport() {
        const transporter = nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST'),
            port: this.configService.get('EMAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('EMAIL_USERNAME'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });

        return transporter;
    }
    // End Mail Transport

    // Send Email Verification From Supervisor To User
    async sendEmailVerification(email: string, supervisor_ID: number): Promise<boolean> {
        const supervisor = await this.usersService.findUserbyId(supervisor_ID);
        
        const user = await this.usersRepository.findOne({
            where: {
                email: email
            }
        });

        if (user && user.emailToken) {
            let transporter = this.mailTransport();

            let mailOptions = {
                from: '"I-Learning App:" <' + this.configService.get('EMAIL_USERNAME') + '>',
                to: email,
                subject: 'Verify Email',
                text: 'Verify Email',
                html: 'Hi! <br><br> You have request verify from supervisor account: '
                    + supervisor.name
                    + ' &lt;Email: ' + supervisor.email + '&gt;'
                    + '<br><br> <a href=http://' + this.configService.get('HOST') + ':' + this.configService.get('PORT') + '/homeadmin/email/verify/' + user.emailToken + '/' + supervisor_ID + '>Click here</a>'
            }

            var sent = await new Promise<boolean>(async function (resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log('Message sent: %s', error);
                        return reject(false);
                    }
                    console.log('Message sent: %s', info.messageId);
                    resolve(true);
                });
            })

            return sent;

        } else {
            throw new HttpException('SEND_REQUEST.EMAIL_OF_ACCOUNT_NOT_FOUND', HttpStatus.FORBIDDEN);
        }
    }
    // End Send Email Verification From Supervisor To User

    // Verify Email From User
    async verifyEmail(token: string, supervisorID: number): Promise<boolean> {
        var user = await this.usersRepository.findOne({
            where: {
                emailToken: token
            }
        });

        console.log('user name: ', user.name)

        if (user) {

            user.supervisorID = supervisorID;
            this.usersRepository.save(user);

            console.log('user supervisorID: ', user.supervisorID)
            return true;

        } else {
            throw new HttpException('ADD_MANAGED_USER.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
        }
    }
    // End Verify Email From User

    // Get Managed User by Supervisor ID
    async getManagedUserBySupervisorID(supervisor_ID: number): Promise<User[]> {
        // const users = await this.usersRepository.find({ where: { supervisorID: supervisor_ID } });
        // const user = await this.usersRepository.findOne({ where: { ID: supervisor_ID } });
        // console.log('user: ', user);
        // console.log('users supervisorID: ', user.supervisorID);
        const users = await this.usersRepository.find({
            where: { supervisorID: supervisor_ID },
          });
        //   console.log('list user: ', users);
        if (!users || users.length === 0) {
            throw new NotFoundException();
        }
        return users;
    }

    async removeSupervisorIDField(user_id: number): Promise<void> {
        const user = await this.usersService.findUserbyId(user_id);

        if (!user) {
            throw new NotFoundException();
        }
        
        try {
            user.supervisorID = null;
        await this.usersRepository.save(user);
        }
        catch(error){
            console.log("Delete supervisorID fail: ", error);
        }
    }
}