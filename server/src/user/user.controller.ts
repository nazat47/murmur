import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { IActiveUser } from "./interfaces/active-user.interface";
import { ActiveUser } from "./decorators/active-user.decorator";
import { AccessTokenGuard } from "./guards/access-token.guard";

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

  @Post("/toggle-follow/:userId")
  @UseGuards(AccessTokenGuard)
  public toggleFollow(
    @Param("userId") followUserId: string,
    @ActiveUser() user: IActiveUser
  ) {
    return this.userService.toggleFollowUser(user, followUserId);
  }

  @Get("/followers")
  @UseGuards(AccessTokenGuard)
  public getFollowers(@ActiveUser() user: IActiveUser) {
    return this.userService.getFollowers(Number(user.sub));
  }

  @Get()
  public getUsers() {
    return this.userService.getAllUsers();
  }

  @Get("/followings")
  @UseGuards(AccessTokenGuard)
  public getFollowings(@ActiveUser() user: IActiveUser) {
    return this.userService.getFollowings(Number(user.sub));
  }
}
