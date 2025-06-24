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
exports.MurmurController = void 0;
const common_1 = require("@nestjs/common");
const murmur_service_1 = require("./murmur.service");
const create_murmur_dto_1 = require("./dto/create-murmur.dto");
const access_token_guard_1 = require("../user/guards/access-token.guard");
const active_user_decorator_1 = require("../user/decorators/active-user.decorator");
const pagination_query_dto_1 = require("../common/pagination/dtos/pagination-query.dto");
let MurmurController = class MurmurController {
    constructor(murmurService) {
        this.murmurService = murmurService;
    }
    createMurmur(createMurmurDto, user) {
        return this.murmurService.createMurmur(createMurmurDto, user);
    }
    getMurmurs(user, query) {
        return this.murmurService.findAllMurmurs(user, query);
    }
    deleteMurmur(user, murmurId) {
        return this.murmurService.deleteMurmur(murmurId, user);
    }
    toggleLike(murmurId, user) {
        return this.murmurService.toggleLikeMurmur(murmurId, user);
    }
};
exports.MurmurController = MurmurController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_murmur_dto_1.CreateMurmurDto, Object]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "createMurmur", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "getMurmurs", null);
__decorate([
    (0, common_1.Delete)("/:murmurId"),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Param)("murmurId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "deleteMurmur", null);
__decorate([
    (0, common_1.Put)("/like/:id"),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MurmurController.prototype, "toggleLike", null);
exports.MurmurController = MurmurController = __decorate([
    (0, common_1.Controller)("murmur"),
    __metadata("design:paramtypes", [murmur_service_1.MurmurService])
], MurmurController);
//# sourceMappingURL=murmur.controller.js.map