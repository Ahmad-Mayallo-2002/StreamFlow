import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WatchLaterVideo,
  WatchLaterVideoSchema,
} from './entities/watch-later-video.entity';
import { WatchLaterVideoService } from './watch-later-video.service';
import { WatchLaterVideoController } from './watch-later-video.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WatchLaterVideo.name, schema: WatchLaterVideoSchema },
    ]),
  ],
  controllers: [WatchLaterVideoController],
  providers: [WatchLaterVideoService],
})
export class WatchLaterVideoModule {}
