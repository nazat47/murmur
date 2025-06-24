import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { IActiveUser } from "./interfaces/active-user.interface";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    toggleFollow(followUserId: string, user: IActiveUser): Promise<{
        message: string;
    }>;
    getUser(userId: string): Promise<import("../entities/user.entity").User>;
    getUserProfile(user: IActiveUser): Promise<import("../entities/user.entity").User>;
    getFollowers(user: IActiveUser): Promise<{
        count: number;
        followers: import("../entities/user.entity").User[];
    }>;
    getNonFollowings(user: IActiveUser): Promise<import("../entities/user.entity").User[]>;
    getUsers(): Promise<import("../entities/user.entity").User[]>;
    getFollowings(user: IActiveUser): Promise<{
        count: number;
        followings: import("../entities/user.entity").User[];
    }>;
}
