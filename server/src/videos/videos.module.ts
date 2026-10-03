import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './entities/video.entity';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
})
export class VideosModule {}
