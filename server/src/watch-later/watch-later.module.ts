import { Module } from '@nestjs/common';
import { WatchLaterService } from './watch-later.service';
import { WatchLaterController } from './watch-later.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchLater, WatchLaterSchema } from './entities/watch-later.entity';
import { WatchLaterVideoService } from '../watch-later-video/watch-later-video.service';
import {
  WatchLaterVideo,
  WatchLaterVideoSchema,
} from '../watch-later-video/entities/watch-later-video.entity';

@Module({
  controllers: [WatchLaterController],
  providers: [WatchLaterService, WatchLaterVideoService],
  imports: [
    MongooseModule.forFeature([
      { name: WatchLater.name, schema: WatchLaterSchema },
      { name: WatchLaterVideo.name, schema: WatchLaterVideoSchema },
    ]),
  ],
})
export class WatchLaterModule {}
