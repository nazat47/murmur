import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Timeline } from "src/entities/timeline.entity";
import { MurmurService } from "src/murmur/murmur.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline)
    private readonly timelineRepository: Repository<Timeline>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => MurmurService))
    private readonly murmurService: MurmurService,
    private readonly paginationProvider: PaginationProvider
  ) {}

  async createTimelineEntry(
    murmurId: string,
    userId: number
  ): Promise<Timeline> {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const murmur = await this.murmurService.findMurmurById(murmurId);
      if (!murmur) {
        throw new NotFoundException(`Murmur with ID ${murmurId} not found`);
      }

      const timelineEntry = this.timelineRepository.create({
        user,
        murmur,
      });
      return await this.timelineRepository.save(timelineEntry);
    } catch (error) {
      throw new RequestTimeoutException(error.message);
    }
  }

  async getTimeline(
    userId: number,
    query: PaginationQueryDto
  ): Promise<Paginated<Timeline>> {
    try {
      const timeline = await this.paginationProvider.paginateQuery<Timeline>(
        {
          limit: query.limit,
          page: query.page,
        },
        this.timelineRepository,
        JSON.stringify({ user: { id: userId } }),
        JSON.stringify({ createdAt: "DESC" })
      );
      return timeline;
    } catch (error) {
      throw new RequestTimeoutException(error.message);
    }
  }
}
