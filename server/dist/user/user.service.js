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
const follow_entity_1 = require("../entities/follow.entity");
let UserService = class UserService {
    constructor(userRepo, followRepo, bcryptProvider, tokenProvider) {
        this.userRepo = userRepo;
        this.followRepo = followRepo;
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
            return newUser;
        }
        catch (error) {
            throw error;
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
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.RequestTimeoutException("Unable to process your request at the moment");
        }
    }
    async findUserById(id) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    id,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException("User not found");
            }
            return user;
        }
        catch (error) {
            throw new common_1.RequestTimeoutException("Unable to process your request at the moment");
        }
    }
    async getAllUsers() {
        try {
            const users = await this.userRepo.find({});
            return users;
        }
        catch (error) {
            throw new common_1.RequestTimeoutException("Unable to process your request at the moment");
        }
    }
    async toggleFollowUser(user, followUserId) {
        try {
            if (user.sub === Number(followUserId)) {
                throw new common_1.BadRequestException("You cannot follow yourself");
            }
            const currentUser = await this.userRepo.findOneBy({ id: user.sub });
            const userToFollow = await this.userRepo.findOneBy({
                id: Number(followUserId),
            });
            if (!userToFollow) {
                throw new common_1.NotFoundException("User to follow not found");
            }
            const existingFollow = await this.followRepo.findOne({
                where: {
                    followedBy: { id: user.sub },
                    followedUser: { id: Number(followUserId) },
                },
            });
            if (existingFollow) {
                await this.followRepo.remove(existingFollow);
                return { message: "Unfollowed user successfully" };
            }
            else {
                const follow = this.followRepo.create({
                    followedBy: currentUser,
                    followedUser: userToFollow,
                });
                await this.followRepo.save(follow);
                return { message: "Followed user successfully" };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getFollowers(userId) {
        try {
            const followers = await this.followRepo.find({
                where: { followedUser: { id: userId } },
            });
            return {
                count: followers.length,
                followers: followers.map((f) => f.followedBy),
            };
        }
        catch (error) {
            throw new common_1.RequestTimeoutException("Unable to process your request at the moment");
        }
    }
    async getFollowings(userId) {
        try {
            const followings = await this.followRepo.find({
                where: { followedBy: { id: userId } },
            });
            return {
                count: followings.length,
                followings: followings.map((f) => f.followedUser),
            };
        }
        catch (error) {
            throw new common_1.RequestTimeoutException("Unable to process your request at the moment");
        }
    }
    async getNonFollowings(userId) {
        try {
            const users = await this.userRepo
                .createQueryBuilder("user")
                .where("user.id != :userId", { userId })
                .andWhere((qb) => {
                const subQuery = qb
                    .subQuery()
                    .select("follow.followedUserId")
                    .from(follow_entity_1.Follow, "follow")
                    .where("follow.followedById = :userId", { userId })
                    .getQuery();
                return "user.id NOT IN " + subQuery;
            })
                .getMany();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        bcrypt_provider_1.BcryptProvider,
        token_provider_1.TokenProvider])
], UserService);
//# sourceMappingURL=user.service.js.map