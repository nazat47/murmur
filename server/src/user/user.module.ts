import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { TokenProvider } from "./providers/token.provider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [UserController],
  providers: [UserService, BcryptProvider, TokenProvider],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
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
