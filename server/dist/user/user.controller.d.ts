import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(createUserDto: CreateUserDto): Promise<Record<string, any>>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
