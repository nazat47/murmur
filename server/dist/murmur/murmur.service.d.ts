import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Murmur } from "src/entities/murmur.entity";
import { Repository } from "typeorm";
import { CreateMurmurDto } from "./dto/murmur.dto";
import { Paginated } from "src/common/pagination/interfaces/paginated.interface";
import { IActiveUser } from "src/user/interfaces/active-user.interface";
import { UserService } from "src/user/user.service";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";
export declare class MurmurService {
    private readonly paginationProvider;
    private readonly userService;
    private readonly murmurRepository;
    constructor(paginationProvider: PaginationProvider, userService: UserService, murmurRepository: Repository<Murmur>);
    createMurmur(murmurDto: CreateMurmurDto, user: IActiveUser): Promise<Murmur>;
    findAllMurmurs(user: IActiveUser, query: PaginationQueryDto): Promise<Paginated<Murmur>>;
    deleteMurmur(murmurId: string, user: IActiveUser): Promise<{
        message: string;
    }>;
}
