import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from '../../common/validators/is-object-id/is-object-id';

export class CreateWatchLaterVideoDto {
  @IsNotEmpty()
  @IsObjectId()
  watchLater!: string;

  @IsNotEmpty()
  @IsObjectId()
  video!: string;
}
