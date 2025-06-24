import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptProvider {
  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  public async comparePassword(
    candidatePassword: string | Buffer,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
