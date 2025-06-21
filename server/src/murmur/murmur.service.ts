import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Murmur } from "src/entities/murmur.entity";
import { Repository } from "typeorm";
import { CreateMurmurDto } from "./dto/murmur.dto";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";
import { IActiveUser } from "src/user/interfaces/active-user.interface";
import { UserService } from "src/user/user.service";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";

@Injectable()
export class MurmurService {
  constructor(
    private readonly paginationProvider: PaginationProvider,

    private readonly userService: UserService,

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

      return await this.murmurRepository.save(murmur);
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
        "author",
        user.sub
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
}
