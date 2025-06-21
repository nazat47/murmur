import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDto } from "./dtos/login.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post("login")
  public login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
