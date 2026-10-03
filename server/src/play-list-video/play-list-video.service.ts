import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PlayListVideo,
  PlayListVideoDocument,
} from './entities/play-list-video.entity';
import { Model, Types } from 'mongoose';
import { calculationPagination } from '../common/calculationPagination';

@Injectable()
export class PlayListVideoService {
  constructor(
    @InjectModel(PlayListVideo.name)
    private readonly playListVideo: Model<PlayListVideoDocument>,
  ) {}

  async create(video: string, playList: string) {
    const body = {
      video: Types.ObjectId.createFromHexString(video),
      playList: Types.ObjectId.createFromHexString(playList),
    };
    const exist = await this.playListVideo.findOne(body);
    if (exist) throw new BadRequestException('Already exist in your playlist');

    return (await this.playListVideo.create(body)).save();
  }

  async remove(id: string) {
    const video = await this.playListVideo.findOneAndDelete({ id });
    if (!video) throw new NotFoundException('Video not found in playlist');
    return video;
  }

  async getById(id: string) {
    const video = await this.playListVideo.findById(id).populate({
      path: 'video',
      populate: [{ path: 'user' }],
    });
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  async getPlaylistVideos(playList: string, take: number, skip: number) {
    const [data, counts] = await Promise.all([
      this.playListVideo
        .find({ playList: Types.ObjectId.createFromHexString(playList) })
        .populate({
          path: 'video',
          populate: [{ path: 'user' }, { path: 'category' }],
        })
        .limit(take)
        .skip(skip),
      this.playListVideo.countDocuments({
        playList: Types.ObjectId.createFromHexString(playList),
      }),
    ]);

    if (!counts) throw new NotFoundException('This playlist is empty');

    return {
      data,
      pagination: calculationPagination(counts, take, skip),
    };
  }
}
