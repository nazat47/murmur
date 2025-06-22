import { forwardRef, Module } from "@nestjs/common";
import { TimelineService } from "./timeline.service";
import { TimelineController } from "./timeline.controller";
import { UserModule } from "src/user/user.module";
import { MurmurModule } from "src/murmur/murmur.module";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Timeline } from "src/entities/timeline.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  providers: [TimelineService],
  controllers: [TimelineController],
  imports: [
    TypeOrmModule.forFeature([Timeline]),
    UserModule,
    forwardRef(() => MurmurModule),
    PaginationModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
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
  exports: [TimelineService],
})
export class TimelineModule {}
