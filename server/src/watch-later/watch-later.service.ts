import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WatchLater, WatchLaterDocument } from './entities/watch-later.entity';
import { Model, Types } from 'mongoose';
import { WatchLaterVideoService } from '../watch-later-video/watch-later-video.service';

@Injectable()
export class WatchLaterService {
  constructor(
    @InjectModel(WatchLater.name)
    private readonly watchLaterModel: Model<WatchLaterDocument>,
    private readonly watchLaterVideoService: WatchLaterVideoService,
  ) {}

  async findUserWatchLater(userId: string): Promise<WatchLaterDocument> {
    const watchLater = await this.watchLaterModel.findOne({
      owner: Types.ObjectId.createFromHexString(userId),
    });
    if (!watchLater)
      throw new NotFoundException('User not has watch later playlist');
    return watchLater;
  }

  async addToWatchLater(videoId: string, userId: string) {
    let watchLater = await this.watchLaterModel.findOne({
      owner: Types.ObjectId.createFromHexString(userId),
    });

    if (!watchLater)
      watchLater = await this.watchLaterModel.create({
        owner: Types.ObjectId.createFromHexString(userId),
      });

    console.log(watchLater);

    return await this.watchLaterVideoService.create({
      watchLater: watchLater._id.toString(),
      video: videoId,
    });
  }
}
