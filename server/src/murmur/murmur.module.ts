import { Module } from "@nestjs/common";
import { MurmurController } from "./murmur.controller";
import { MurmurService } from "./murmur.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Murmur } from "src/entities/murmur.entity";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { UserModule } from "src/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [MurmurController],
  providers: [MurmurService],
  exports: [MurmurService],
  imports: [
    TypeOrmModule.forFeature([Murmur]),
    PaginationModule,
    UserModule,
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
})
export class MurmurModule {}
