import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { MurmurService } from "./murmur.service";
import { CreateMurmurDto } from "./dto/create-murmur.dto";
import { AccessTokenGuard } from "src/user/guards/access-token.guard";
import { ActiveUser } from "src/user/decorators/active-user.decorator";
import { IActiveUser } from "src/user/interfaces/active-user.interface";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";

@Controller("murmur")
export class MurmurController {
  constructor(private readonly murmurService: MurmurService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  createMurmur(
    @Body() createMurmurDto: CreateMurmurDto,
    @ActiveUser() user: IActiveUser
  ) {
    return this.murmurService.createMurmur(createMurmurDto, user);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  getMurmurs(
    @ActiveUser() user: IActiveUser,
    @Query() query: PaginationQueryDto
  ) {
    return this.murmurService.findAllMurmurs(user, query);
  }

  @Delete("/:murmurId")
  @UseGuards(AccessTokenGuard)
  deleteMurmur(
    @ActiveUser() user: IActiveUser,
    @Param("murmurId") murmurId: string
  ) {
    return this.murmurService.deleteMurmur(murmurId, user);
  }

  @Put("/like/:id")
  @UseGuards(AccessTokenGuard)
  toggleLike(@Param("id") murmurId: string, @ActiveUser() user: IActiveUser) {
    return this.murmurService.toggleLikeMurmur(murmurId, user);
  }
}
