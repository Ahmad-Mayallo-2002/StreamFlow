import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayListDto {
  @IsNotEmpty()
  @IsString()
  title!: string;
}
