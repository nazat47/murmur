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

  @Get("/:id")
  @UseGuards(AccessTokenGuard)
  public getUser(@Param("id") userId: string) {
    return this.userService.findUserById(Number(userId));
  }

  @Get("/profile/details")
  @UseGuards(AccessTokenGuard)
  public getUserProfile(@ActiveUser() user: IActiveUser) {
    return this.userService.findUserById(Number(user.sub));
  }

  @Get("/my/followers")
  @UseGuards(AccessTokenGuard)
  public getFollowers(@ActiveUser() user: IActiveUser) {
    return this.userService.getFollowers(Number(user.sub));
  }

  @Get("/my/non-followings")
  @UseGuards(AccessTokenGuard)
  public getNonFollowings(@ActiveUser() user: IActiveUser) {
    return this.userService.getNonFollowings(Number(user.sub));
  }

  @Get()
  public getUsers() {
    return this.userService.getAllUsers();
  }

  @Get("/my/followings")
  @UseGuards(AccessTokenGuard)
  public getFollowings(@ActiveUser() user: IActiveUser) {
    return this.userService.getFollowings(Number(user.sub));
  }
}
