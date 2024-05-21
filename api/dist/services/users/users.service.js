"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository, configService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
    }
    async signUp(signupDto) {
        signupDto.password = bcrypt.hashSync(signupDto.password, Number(process.env.BCRYPT_SALT_ROUND));
        const user = this.usersRepository.create(signupDto);
        await this.usersRepository.save(user);
        return user;
    }
    async findByEmail(email) {
        return await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });
    }
    async updateProfile(username, updateUserDto) {
        const user = await this.findByEmail(username);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        Object.assign(user, updateUserDto);
        const userEdit = await this.usersRepository.save(user);
        delete (userEdit.password);
        return userEdit;
    }
    async checkPassword(email, password) {
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });
        if (!user)
            throw new common_1.HttpException('LOGIN.USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
        if (!bcrypt.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async setPassword(email, newPassword) {
        var user = await this.usersRepository.findOne({
            where: {
                email: email
            }
        });
        if (!user)
            throw new common_1.HttpException('LOGIN.USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
        user.password = bcrypt.hashSync(newPassword, Number(process.env.BCRYPT_SALT_ROUND));
        await this.usersRepository.save(user);
        return true;
    }
    async findUserbyId(ID) {
        return await this.usersRepository.findOne({ where: { ID: ID } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map