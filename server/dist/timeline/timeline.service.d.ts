import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Timeline } from "src/entities/timeline.entity";
import { MurmurService } from "src/murmur/murmur.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
export declare class TimelineService {
    private readonly timelineRepository;
    private readonly userService;
    private readonly murmurService;
    private readonly paginationProvider;
    constructor(timelineRepository: Repository<Timeline>, userService: UserService, murmurService: MurmurService, paginationProvider: PaginationProvider);
    createTimelineEntry(murmurId: string, userId: number): Promise<Timeline>;
    getTimeline(userId: number, query: PaginationQueryDto): Promise<Paginated<Timeline>>;
}
