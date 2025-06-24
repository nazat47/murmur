import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Murmur } from "src/entities/murmur.entity";
import { Repository } from "typeorm";
import { CreateMurmurDto } from "./dto/create-murmur.dto";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";
import { IActiveUser } from "src/user/interfaces/active-user.interface";
import { UserService } from "src/user/user.service";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";
import { UpdateMurmurDto } from "./dto/update-murmur.dto";
import { TimelineService } from "src/timeline/timeline.service";

@Injectable()
export class MurmurService {
  constructor(
    private readonly paginationProvider: PaginationProvider,

    private readonly userService: UserService,

    @Inject(forwardRef(() => TimelineService))
    private readonly timelineService: TimelineService,

    @InjectRepository(Murmur)
    private readonly murmurRepository: Repository<Murmur>
  ) {}

  async createMurmur(
    murmurDto: CreateMurmurDto,
    user: IActiveUser
  ): Promise<Murmur> {
    try {
      const author = await this.userService.findUserById(user.sub);

      const murmur = this.murmurRepository.create({
        ...murmurDto,
        author,
      });

      const savedMurmur = await this.murmurRepository.save(murmur);

      const followersData = await this.userService.getFollowers(author.id);

      for (const follower of followersData.followers) {
        const timeline = await this.timelineService.createTimelineEntry(
          savedMurmur.id,
          follower.id
        );
      }
      return savedMurmur;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async findAllMurmurs(
    user: IActiveUser,
    query: PaginationQueryDto
  ): Promise<Paginated<Murmur>> {
    try {
      const murmurs = await this.paginationProvider.paginateQuery<Murmur>(
        {
          limit: query.limit,
          page: query.page,
        },
        this.murmurRepository,
        JSON.stringify({ author: { id: user.sub } }),
        JSON.stringify({ createdAt: "DESC" })
      );
      return murmurs;
    } catch (error) {
      throw new RequestTimeoutException(error.message);
    }
  }

  async deleteMurmur(murmurId: string, user: IActiveUser) {
    try {
      const murmur = await this.murmurRepository.findOne({
        where: { id: murmurId, author: { id: user.sub } },
      });

      if (!murmur) {
        throw new ConflictException("Murmur not found or you do not own it");
      }

      await this.murmurRepository.delete(murmurId);
      return { message: "Murmur deleted successfully" };
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }

  async updateMurmur(murmurId: string, updateMurmurDto: UpdateMurmurDto) {
    try {
      const murmur = await this.murmurRepository.preload({
        id: murmurId,
        ...updateMurmurDto,
      });

      if (!murmur) {
        throw new ConflictException("Murmur not found or you do not own it");
      }

      return await this.murmurRepository.save(murmur);
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }

  async findMurmurById(murmurId: string): Promise<Murmur> {
    const murmur = await this.murmurRepository.findOne({
      where: { id: murmurId },
    });

    if (!murmur) {
      throw new NotFoundException("Murmur not found");
    }

    return murmur;
  }

  async toggleLikeMurmur(murmurId: string, _user: IActiveUser) {
    const user = await this.userService.findUserById(_user.sub);

    const murmur = await this.murmurRepository.findOne({
      where: { id: murmurId },
    });

    if (!murmur) throw new NotFoundException("Murmur not found");

    const alreadyLiked = murmur.likedBy.some((u) => u.id === user.id);

    if (alreadyLiked) {
      murmur.likedBy = murmur.likedBy.filter((u) => u.id !== user.id);
    } else {
      murmur.likedBy.push(user);
    }

    await this.murmurRepository.save(murmur);

    return { message: alreadyLiked ? "Murmur unliked" : "Murmur liked" };
  }
}
