import { User } from "./user.entity";
export declare class Follow {
    id: string;
    followedUser: User;
    followedBy: User;
    createdAt: Date;
    updatedAt: Date;
}
