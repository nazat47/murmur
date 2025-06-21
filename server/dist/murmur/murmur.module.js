"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MurmurModule = void 0;
const common_1 = require("@nestjs/common");
const murmur_controller_1 = require("./murmur.controller");
const murmur_service_1 = require("./murmur.service");
const typeorm_1 = require("@nestjs/typeorm");
const murmur_entity_1 = require("../entities/murmur.entity");
const pagination_module_1 = require("../common/pagination/pagination.module");
const user_module_1 = require("../user/user.module");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let MurmurModule = class MurmurModule {
};
exports.MurmurModule = MurmurModule;
exports.MurmurModule = MurmurModule = __decorate([
    (0, common_1.Module)({
        controllers: [murmur_controller_1.MurmurController],
        providers: [murmur_service_1.MurmurService],
        exports: [murmur_service_1.MurmurService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([murmur_entity_1.Murmur]),
            pagination_module_1.PaginationModule,
            user_module_1.UserModule,
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
    })
], MurmurModule);
//# sourceMappingURL=murmur.module.js.map