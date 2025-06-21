import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { REQUEST_KEY } from "../constants/user.constants";
import jwtConfig from "src/config/jwt.config";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractRequestFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      );

      request[REQUEST_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractRequestFromHeader(req: Request): string | undefined {
    const [_, token] = req.headers.authorization?.split(" ") ?? [];
    return token;
  }
}
