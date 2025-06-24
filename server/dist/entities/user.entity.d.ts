import { Murmur } from "./murmur.entity";
import { Follow } from "./follow.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    murmurs: Murmur[];
    followers: Follow[];
    following: Follow[];
}
