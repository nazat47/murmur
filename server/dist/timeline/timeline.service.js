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
exports.TimelineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pagination_provider_1 = require("../common/pagination/providers/pagination.provider");
const timeline_entity_1 = require("../entities/timeline.entity");
const murmur_service_1 = require("../murmur/murmur.service");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
let TimelineService = class TimelineService {
    constructor(timelineRepository, userService, murmurService, paginationProvider) {
        this.timelineRepository = timelineRepository;
        this.userService = userService;
        this.murmurService = murmurService;
        this.paginationProvider = paginationProvider;
    }
    async createTimelineEntry(murmurId, userId) {
        try {
            const user = await this.userService.findUserById(userId);
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${userId} not found`);
            }
            const murmur = await this.murmurService.findMurmurById(murmurId);
            if (!murmur) {
                throw new common_1.NotFoundException(`Murmur with ID ${murmurId} not found`);
            }
            const timelineEntry = this.timelineRepository.create({
                user,
                murmur,
            });
            return await this.timelineRepository.save(timelineEntry);
        }
        catch (error) {
            throw new common_1.RequestTimeoutException(error.message);
        }
    }
    async getTimeline(userId, query) {
        try {
            const timeline = await this.paginationProvider.paginateQuery({
                limit: query.limit,
                page: query.page,
            }, this.timelineRepository, JSON.stringify({ user: { id: userId } }), JSON.stringify({ createdAt: "DESC" }));
            return timeline;
        }
        catch (error) {
            throw new common_1.RequestTimeoutException(error.message);
        }
    }
};
exports.TimelineService = TimelineService;
exports.TimelineService = TimelineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(timeline_entity_1.Timeline)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => murmur_service_1.MurmurService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        murmur_service_1.MurmurService,
        pagination_provider_1.PaginationProvider])
], TimelineService);
//# sourceMappingURL=timeline.service.js.map