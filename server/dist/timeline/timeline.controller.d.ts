import { TimelineService } from "./timeline.service";
import { IActiveUser } from "src/user/interfaces/active-user.interface";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";
export declare class TimelineController {
    private readonly timelineService;
    constructor(timelineService: TimelineService);
    getTimeline(user: IActiveUser, query: PaginationQueryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("../entities/timeline.entity").Timeline>>;
}
