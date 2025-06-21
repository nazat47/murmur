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
exports.MurmurService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_provider_1 = require("../common/pagination/providers/pagination.provider");
const murmur_entity_1 = require("../entities/murmur.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
let MurmurService = class MurmurService {
    constructor(paginationProvider, userService, murmurRepository) {
        this.paginationProvider = paginationProvider;
        this.userService = userService;
        this.murmurRepository = murmurRepository;
    }
    async createMurmur(murmurDto, user) {
        try {
            const author = await this.userService.findUserById(user.sub);
            const murmur = this.murmurRepository.create({
                ...murmurDto,
                author,
            });
            return await this.murmurRepository.save(murmur);
        }
        catch (error) {
            throw new common_1.ConflictException(error.message);
        }
    }
    async findAllMurmurs(user, query) {
        try {
            const murmurs = await this.paginationProvider.paginateQuery({
                limit: query.limit,
                page: query.page,
            }, this.murmurRepository, "author", user.sub);
            return murmurs;
        }
        catch (error) {
            throw new common_1.RequestTimeoutException(error.message);
        }
    }
    async deleteMurmur(murmurId, user) {
        try {
            const murmur = await this.murmurRepository.findOne({
                where: { id: murmurId, author: { id: user.sub } },
            });
            if (!murmur) {
                throw new common_1.ConflictException("Murmur not found or you do not own it");
            }
            await this.murmurRepository.delete(murmurId);
            return { message: "Murmur deleted successfully" };
        }
        catch (error) {
            throw new common_1.RequestTimeoutException("Unable to process your request at the moment");
        }
    }
};
exports.MurmurService = MurmurService;
exports.MurmurService = MurmurService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __metadata("design:paramtypes", [pagination_provider_1.PaginationProvider,
        user_service_1.UserService,
        typeorm_2.Repository])
], MurmurService);
//# sourceMappingURL=murmur.service.js.map