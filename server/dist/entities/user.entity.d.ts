import { Murmur } from "./murmur.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    murmurs: Murmur[];
}
