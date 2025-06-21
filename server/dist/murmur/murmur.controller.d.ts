import { MurmurService } from "./murmur.service";
import { CreateMurmurDto } from "./dto/murmur.dto";
import { IActiveUser } from "src/user/interfaces/active-user.interface";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";
export declare class MurmurController {
    private readonly murmurService;
    constructor(murmurService: MurmurService);
    createMurmur(createMurmurDto: CreateMurmurDto, user: IActiveUser): Promise<import("../entities/murmur.entity").Murmur>;
    getMurmurs(user: IActiveUser, query: PaginationQueryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("../entities/murmur.entity").Murmur>>;
    deleteMurmur(user: IActiveUser, murmurId: string): Promise<{
        message: string;
    }>;
}
