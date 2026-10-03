import { Module } from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { PlayListController } from './play-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayList, PlayListSchema } from './entities/play-list.entity';

@Module({
  controllers: [PlayListController],
  providers: [PlayListService],
  imports: [
    MongooseModule.forFeature([
      { name: PlayList.name, schema: PlayListSchema },
    ]),
  ],
})
export class PlayListModule {}
