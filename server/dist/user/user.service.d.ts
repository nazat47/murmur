import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { LoginDto } from "./dtos/login.dto";
import { TokenProvider } from "./providers/token.provider";
export declare class UserService {
    private readonly userRepo;
    private readonly bcryptProvider;
    private readonly tokenProvider;
    constructor(userRepo: Repository<User>, bcryptProvider: BcryptProvider, tokenProvider: TokenProvider);
    signUp(createUserDto: CreateUserDto): Promise<Record<string, any>>;
    login(signInDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    findUserById(id: number): Promise<User>;
}
