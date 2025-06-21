import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { LoginDto } from "./dtos/login.dto";
import { TokenProvider } from "./providers/token.provider";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly bcryptProvider: BcryptProvider,
    private readonly tokenProvider: TokenProvider
  ) {}

  public async signUp(createUserDto: CreateUserDto) {
    try {
      let existingUser: User | null = null;
      existingUser = await this.userRepo.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingUser) {
        throw new BadRequestException("User already exists");
      }

      const hashedPassword = await this.bcryptProvider.hashPassword(
        createUserDto.password
      );
      let newUser = this.userRepo.create({
        ...createUserDto,
        password: hashedPassword,
      });
      newUser = await this.userRepo.save(newUser);
      return instanceToPlain(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }

  public async login(signInDto: LoginDto) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          email: signInDto.email,
        },
      });

      if (!user) {
        throw new NotFoundException("User does not exists");
      }
      let isEqual: boolean = false;

      isEqual = await this.bcryptProvider.comparePassword(
        signInDto.password,
        user.password!
      );

      if (!isEqual) {
        throw new ForbiddenException("Invalid credentials");
      }

      return this.tokenProvider.generateTokens(user);
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "Unable to process your request at the moment",
      });
    }
  }

  public async findUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }
}
