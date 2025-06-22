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
import { Follow } from "./entities/follow.entity";
import { Timeline } from "./entities/timeline.entity";

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
      username: "docker",
      password: "docker",
      database: "test",
      entities: [User, Murmur, Follow, Timeline],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Murmur, Follow, Timeline]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
