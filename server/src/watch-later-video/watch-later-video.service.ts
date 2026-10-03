import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  WatchLaterVideo,
  WatchLaterVideoDocument,
} from './entities/watch-later-video.entity';
import { CreateWatchLaterVideoDto } from './dto/create-watch-later-video.dto';
import { calculationPagination } from '../common/calculationPagination';

@Injectable()
export class WatchLaterVideoService {
  constructor(
    @InjectModel(WatchLaterVideo.name)
    private readonly watchLaterVideoModel: Model<WatchLaterVideoDocument>,
  ) {}

  async create(input: CreateWatchLaterVideoDto) {
    const { video, watchLater } = input;

    const filter = {
      video: Types.ObjectId.createFromHexString(video),
      watchLater: Types.ObjectId.createFromHexString(watchLater),
    };

    const existing = await this.watchLaterVideoModel.findOne(filter);

    if (existing)
      throw new BadRequestException('Already exist in your watch later list');

    const created = await this.watchLaterVideoModel.create(filter);

    return created;
  }

  async remove(id: string) {
    const deleted = await this.watchLaterVideoModel.findByIdAndDelete(id);

    if (!deleted)
      throw new NotFoundException('Video not found in watch later list');

    return deleted;
  }

  async getById(id: string) {
    const video = await this.watchLaterVideoModel.findById(id).populate({
      path: 'video',
      populate: [{ path: 'user' }, { path: 'category' }],
    });

    if (!video) throw new NotFoundException('Video not found in watch later');

    return video;
  }

  async getWatchLaterVideos(watchLater: string, take: number, skip: number) {
    const [data, counts] = await Promise.all([
      this.watchLaterVideoModel
        .find({ watchLater: Types.ObjectId.createFromHexString(watchLater) })
        .populate({
          path: 'video',
          populate: [{ path: 'user' }, { path: 'category' }],
        })
        .limit(take)
        .skip(skip),
      this.watchLaterVideoModel.countDocuments({
        watchLater: Types.ObjectId.createFromHexString(watchLater),
      }),
    ]);

    if (!counts) throw new NotFoundException('This watch later list is empty');

    return {
      data,
      pagination: calculationPagination(counts, take, skip),
    };
  }
}
