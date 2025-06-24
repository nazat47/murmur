import { Murmur } from "./murmur.entity";
import { User } from "./user.entity";
export declare class Timeline {
    id: number;
    murmur: Murmur;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
