import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateMurmurDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  likesCount: number;
}
