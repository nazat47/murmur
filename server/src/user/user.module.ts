import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { TokenProvider } from "./providers/token.provider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenGuard } from "./guards/access-token.guard";
import { Follow } from "src/entities/follow.entity";

@Module({
  controllers: [UserController],
  providers: [UserService, BcryptProvider, TokenProvider, AccessTokenGuard],
  exports: [UserService, AccessTokenGuard],
  imports: [
    TypeOrmModule.forFeature([User, Follow]),
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
export class UserModule {}
