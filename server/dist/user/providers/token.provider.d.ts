import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { ConfigService } from "@nestjs/config";
export declare class TokenProvider {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    signToken<T>(userId: number, expiresIn: number, payload?: T): Promise<string>;
    generateTokens(user: User): Promise<{
        accessToken: string;
    }>;
}
