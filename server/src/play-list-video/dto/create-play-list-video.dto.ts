import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from '../../common/validators/is-object-id/is-object-id';
import { Types } from 'mongoose';

export class CreatePlayListVideoDto {
  @IsNotEmpty()
  @IsObjectId()
  playList!: Types.ObjectId;

  @IsNotEmpty()
  @IsObjectId()
  video!: Types.ObjectId;
}
