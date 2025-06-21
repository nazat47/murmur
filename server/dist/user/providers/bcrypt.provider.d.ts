export declare class BcryptProvider {
    hashPassword(password: string): Promise<any>;
    comparePassword(candidatePassword: string | Buffer, hashedPassword: string): Promise<boolean>;
}
