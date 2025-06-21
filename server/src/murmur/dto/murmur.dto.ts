import { IsNotEmpty, IsString } from "class-validator";

export class CreateMurmurDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  authorId: string;
}
