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
exports.TimelineController = void 0;
const common_1 = require("@nestjs/common");
const timeline_service_1 = require("./timeline.service");
const access_token_guard_1 = require("../user/guards/access-token.guard");
const active_user_decorator_1 = require("../user/decorators/active-user.decorator");
const pagination_query_dto_1 = require("../common/pagination/dtos/pagination-query.dto");
let TimelineController = class TimelineController {
    constructor(timelineService) {
        this.timelineService = timelineService;
    }
    getTimeline(user, query) {
        return this.timelineService.getTimeline(user.sub, query);
    }
};
exports.TimelineController = TimelineController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], TimelineController.prototype, "getTimeline", null);
exports.TimelineController = TimelineController = __decorate([
    (0, common_1.Controller)("timeline"),
    __metadata("design:paramtypes", [timeline_service_1.TimelineService])
], TimelineController);
//# sourceMappingURL=timeline.controller.js.map