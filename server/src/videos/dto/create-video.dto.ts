import { IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from '../../common/validators/is-object-id/is-object-id';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsObjectId()
  category!: string;
}
