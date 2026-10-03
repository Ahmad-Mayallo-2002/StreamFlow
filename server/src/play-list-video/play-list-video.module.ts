import { Module } from '@nestjs/common';
import { PlayListVideoService } from './play-list-video.service';
import { PlayListVideoController } from './play-list-video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlayListVideo,
  PlayListVideoSchema,
} from './entities/play-list-video.entity';
import { PlayListService } from '../play-list/play-list.service';
import {
  PlayList,
  PlayListSchema,
} from '../play-list/entities/play-list.entity';

@Module({
  controllers: [PlayListVideoController],
  providers: [PlayListVideoService, PlayListService],
  imports: [
    MongooseModule.forFeature([
      { name: PlayListVideo.name, schema: PlayListVideoSchema },
      { name: PlayList.name, schema: PlayListSchema },
    ]),
  ],
})
export class PlayListVideoModule {}
