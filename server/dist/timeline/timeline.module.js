"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineModule = void 0;
const common_1 = require("@nestjs/common");
const timeline_service_1 = require("./timeline.service");
const timeline_controller_1 = require("./timeline.controller");
const user_module_1 = require("../user/user.module");
const murmur_module_1 = require("../murmur/murmur.module");
const pagination_module_1 = require("../common/pagination/pagination.module");
const typeorm_1 = require("@nestjs/typeorm");
const timeline_entity_1 = require("../entities/timeline.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let TimelineModule = class TimelineModule {
};
exports.TimelineModule = TimelineModule;
exports.TimelineModule = TimelineModule = __decorate([
    (0, common_1.Module)({
        providers: [timeline_service_1.TimelineService],
        controllers: [timeline_controller_1.TimelineController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([timeline_entity_1.Timeline]),
            user_module_1.UserModule,
            (0, common_1.forwardRef)(() => murmur_module_1.MurmurModule),
            pagination_module_1.PaginationModule,
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const jwtConfig = configService.get("jwt");
                    return {
                        secret: jwtConfig.secret,
                        signOptions: {
                            expiresIn: jwtConfig.expiresIn,
                            audience: jwtConfig.audience,
                            issuer: jwtConfig.issuer,
                        },
                    };
                },
            }),
        ],
        exports: [timeline_service_1.TimelineService],
    })
], TimelineModule);
//# sourceMappingURL=timeline.module.js.map