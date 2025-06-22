import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { LoginDto } from "./dtos/login.dto";
import { TokenProvider } from "./providers/token.provider";
import { IActiveUser } from "./interfaces/active-user.interface";
import { Follow } from "src/entities/follow.entity";
export declare class UserService {
    private readonly userRepo;
    private readonly followRepo;
    private readonly bcryptProvider;
    private readonly tokenProvider;
    constructor(userRepo: Repository<User>, followRepo: Repository<Follow>, bcryptProvider: BcryptProvider, tokenProvider: TokenProvider);
    signUp(createUserDto: CreateUserDto): Promise<User>;
    login(signInDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    findUserById(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
    toggleFollowUser(user: IActiveUser, followUserId: string): Promise<{
        message: string;
    }>;
    getFollowers(userId: number): Promise<{
        count: number;
        followers: User[];
    }>;
    getFollowings(userId: number): Promise<{
        count: number;
        followers: User[];
    }>;
}
