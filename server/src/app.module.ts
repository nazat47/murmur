import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./user/user.module";
import { Murmur } from "./entities/murmur.entity";
import { MurmurModule } from "./murmur/murmur.module";
import { PaginationModule } from "./common/pagination/pagination.module";

@Module({
  imports: [
    UserModule,
    MurmurModule,
    PaginationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [jwtConfig],
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "agent47",
      database: "murmur",
      entities: [User, Murmur],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
