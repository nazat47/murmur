import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { TimelineService } from "./timeline.service";
import { AccessTokenGuard } from "src/user/guards/access-token.guard";
import { ActiveUser } from "src/user/decorators/active-user.decorator";
import { IActiveUser } from "src/user/interfaces/active-user.interface";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";

@Controller("timeline")
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  getTimeline(
    @ActiveUser() user: IActiveUser,
    @Query() query: PaginationQueryDto
  ) {
    return this.timelineService.getTimeline(user.sub, query);
  }
}
