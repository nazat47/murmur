import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { IActiveUser } from "../interfaces/active-user.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.configService.get<string>("jwt.secret"),
        audience: this.configService.get<string>("jwt.audience"),
        issuer: this.configService.get<string>("jwt.issuer"),
        expiresIn,
      }
    );
  }

  public async generateTokens(user: User) {
    const accessToken = await this.signToken<Partial<IActiveUser>>(
      user.id,
      this.configService.get("jwt.expiresIn"),
      {
        email: user.email,
      }
    );

    return { accessToken };
  }
}
