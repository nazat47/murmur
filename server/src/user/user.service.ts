import {
  BadRequestException,
  ForbiddenException,
  HttpException,
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
import { IActiveUser } from "./interfaces/active-user.interface";
import { Follow } from "src/entities/follow.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,

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
      return newUser;
    } catch (error) {
      throw error;
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }

  public async findUserById(id: number) {
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

  public async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepo.find({});

      return users;
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }

  async toggleFollowUser(user: IActiveUser, followUserId: string) {
    try {
      if (user.sub === Number(followUserId)) {
        throw new BadRequestException("You cannot follow yourself");
      }

      const currentUser = await this.userRepo.findOneBy({ id: user.sub });
      const userToFollow = await this.userRepo.findOneBy({
        id: Number(followUserId),
      });

      if (!userToFollow) {
        throw new NotFoundException("User to follow not found");
      }

      const existingFollow = await this.followRepo.findOne({
        where: {
          followedBy: { id: user.sub },
          followedUser: { id: Number(followUserId) },
        },
      });

      if (existingFollow) {
        await this.followRepo.remove(existingFollow);
        return { message: "Unfollowed user successfully" };
      } else {
        const follow = this.followRepo.create({
          followedBy: currentUser,
          followedUser: userToFollow,
        });

        await this.followRepo.save(follow);
        return { message: "Followed user successfully" };
      }
    } catch (error) {
      throw error;
    }
  }

  async getFollowers(userId: number) {
    try {
      const followers = await this.followRepo.find({
        where: { followedUser: { id: userId } },
      });

      return {
        count: followers.length,
        followers: followers.map((f) => f.followedBy),
      };
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }

  async getFollowings(userId: number) {
    try {
      const followings = await this.followRepo.find({
        where: { followedBy: { id: userId } },
      });

      return {
        count: followings.length,
        followings: followings.map((f) => f.followedUser),
      };
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment"
      );
    }
  }

  async getNonFollowings(userId: number): Promise<User[]> {
    try {
      const users = await this.userRepo
        .createQueryBuilder("user")
        .where("user.id != :userId", { userId })
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select("follow.followedUserId")
            .from(Follow, "follow")
            .where("follow.followedById = :userId", { userId })
            .getQuery();
          return "user.id NOT IN " + subQuery;
        })
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }
}
