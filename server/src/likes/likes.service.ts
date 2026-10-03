import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model, Types } from 'mongoose';
import { calculationPagination } from '../common/calculationPagination';
import { IPaginatedData } from '../interfaces/paginatedData.interface';
import { VideoDocument } from '../videos/entities/video.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>,
  ) {}

  async getVideoReacts(videoId: string) {
    const [likes, dislikes] = await Promise.all([
      this.likeModel.countDocuments({
        isLiked: true,
        video: Types.ObjectId.createFromHexString(videoId),
      }),
      this.likeModel.countDocuments({
        isDisliked: true,
        video: Types.ObjectId.createFromHexString(videoId),
      }),
    ]);

    return { likes, dislikes };
  }

  async addLike(videoId: string, userId: string) {
    const filterObject: Partial<LikeDocument> = {
      user: Types.ObjectId.createFromHexString(userId),
      video: Types.ObjectId.createFromHexString(videoId),
    };
    const like = await this.likeModel.findOne(filterObject);

    if (like) {
      if (!like.isLiked) {
        await this.likeModel.findOneAndUpdate(filterObject, {
          isLiked: true,
          isDisliked: false,
        });
        return 'Like added successfully';
      } else {
        await this.likeModel.findOneAndUpdate(filterObject, { isLiked: false });
        return 'Like cancelled successfully';
      }
    } else {
      await this.likeModel.create({ ...filterObject, isLiked: true });
      return 'Like added successfully';
    }
  }

  async addDislike(videoId: string, userId: string) {
    const filterObject: Partial<LikeDocument> = {
      user: Types.ObjectId.createFromHexString(userId),
      video: Types.ObjectId.createFromHexString(videoId),
    };
    const dislike = await this.likeModel.findOne(filterObject);

    if (dislike) {
      if (dislike.isLiked) {
        await this.likeModel.findOneAndUpdate(filterObject, {
          isDisliked: true,
          isLiked: false,
        });
        return 'Dislike added successfully';
      } else {
        await this.likeModel.findOneAndUpdate(filterObject, {
          isDisliked: false,
        });
        return 'Dislike cancelled successfully';
      }
    } else {
      await this.likeModel.create({ ...filterObject, isDisliked: true });
      return 'Dislike added successfully';
    }
  }

  async getUserReact(userId: string, videoId: string) {
    const react = await this.likeModel.findOne({
      user: Types.ObjectId.createFromHexString(userId),
      video: Types.ObjectId.createFromHexString(videoId),
    });
    if (!react) throw new NotFoundException('No react found');
    return react;
  }

  async getUserLikedVideos(
    userId: string,
    take: number = 10,
    skip: number = 0,
  ): Promise<IPaginatedData<VideoDocument>> {
    const user = Types.ObjectId.createFromHexString(userId);
    const [likes, counts] = await Promise.all([
      this.likeModel
        .find({ user, isLiked: true })
        .populate<{ video: VideoDocument }>({
          path: 'video',
          populate: { path: 'user' },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(take),
      this.likeModel.countDocuments({ user, isLiked: true }),
    ]);

    const pagination = counts
      ? calculationPagination(counts, take, skip)
      : { totalPages: 0, currentPage: 0, next: false, prev: false, counts };

    return { data: likes.map(({ video }) => video), pagination };
  }
}
