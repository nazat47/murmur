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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_provider_1 = require("./providers/bcrypt.provider");
const token_provider_1 = require("./providers/token.provider");
const class_transformer_1 = require("class-transformer");
let UserService = class UserService {
    constructor(userRepo, bcryptProvider, tokenProvider) {
        this.userRepo = userRepo;
        this.bcryptProvider = bcryptProvider;
        this.tokenProvider = tokenProvider;
    }
    async signUp(createUserDto) {
        try {
            let existingUser = null;
            existingUser = await this.userRepo.findOne({
                where: {
                    email: createUserDto.email,
                },
            });
            if (existingUser) {
                throw new common_1.BadRequestException("User already exists");
            }
            const hashedPassword = await this.bcryptProvider.hashPassword(createUserDto.password);
            let newUser = this.userRepo.create({
                ...createUserDto,
                password: hashedPassword,
            });
            newUser = await this.userRepo.save(newUser);
            return (0, class_transformer_1.instanceToPlain)(newUser);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException("Unable to process your request at the moment");
        }
    }
    async login(signInDto) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    email: signInDto.email,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException("User does not exists");
            }
            let isEqual = false;
            isEqual = await this.bcryptProvider.comparePassword(signInDto.password, user.password);
            if (!isEqual) {
                throw new common_1.ForbiddenException("Invalid credentials");
            }
            return this.tokenProvider.generateTokens(user);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException(error, {
                description: "Unable to process your request at the moment",
            });
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bcrypt_provider_1.BcryptProvider,
        token_provider_1.TokenProvider])
], UserService);
//# sourceMappingURL=user.service.js.map