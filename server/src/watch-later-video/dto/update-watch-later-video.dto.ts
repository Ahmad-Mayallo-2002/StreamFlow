import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchLaterVideoDto } from './create-watch-later-video.dto';

export class UpdateWatchLaterVideoDto extends PartialType(CreateWatchLaterVideoDto) {}
