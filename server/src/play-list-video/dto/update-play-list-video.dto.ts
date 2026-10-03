import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayListVideoDto } from './create-play-list-video.dto';

export class UpdatePlayListVideoDto extends PartialType(CreatePlayListVideoDto) {}
