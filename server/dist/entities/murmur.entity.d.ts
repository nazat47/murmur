import { User } from "./user.entity";
export declare class Murmur {
    id: string;
    title: string;
    content: string;
    author: User;
    likedBy: User[];
    createdAt: Date;
    updatedAt: Date;
}
