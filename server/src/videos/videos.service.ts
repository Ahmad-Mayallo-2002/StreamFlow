import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { calculationPagination } from '../common/calculationPagination';
import { IPaginatedData } from '../interfaces/paginatedData.interface';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video, VideoDocument } from './entities/video.entity';
import { upload } from '../common/uploader';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: Model<VideoDocument>,
  ) {}

  async create(
    createVideoDto: CreateVideoDto,
    video: Express.Multer.File,
    thumbnail: Express.Multer.File,
  ): Promise<VideoDocument> {
    const { category, ...videoData } = createVideoDto;
    const input: Partial<Video> = {
      ...videoData,
      category: Types.ObjectId.createFromHexString(String(category)),
    };

    const { secure_url, public_id } = await upload(video);
    input.url = secure_url;
    input.public_id = public_id;

    const { secure_url: url, public_id: thubmnail_public_id } =
      await upload(thumbnail);
    input.thumbnail = {
      url,
      public_id: thubmnail_public_id,
    };

    return await new this.videoModel(input).save();
  }

  async findAll(
    skip: number = 0,
    take: number = 32,
    category: string = '',
    search?: string,
  ): Promise<IPaginatedData<VideoDocument>> {
    const filter: Record<any, any> = {};
    if (category)
      filter.category = Types.ObjectId.createFromHexString(category);
    if (search && search.length > 0) {
      filter.$or = [
        { title: { $regex: `${search}`, $options: 'i' } },
        { description: { $regex: `${search}`, $options: 'i' } },
      ];
    }
    const [data, counts] = await Promise.all([
      this.videoModel
        .find(filter)
        .populate('user')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(take),
      this.videoModel.countDocuments(filter),
    ]);

    if (!data.length) throw new NotFoundException('No videos found');

    const pagination = calculationPagination(counts, take, skip);

    return { data, pagination };
  }

  async findUserVideos(
    userId: string,
    take: number = 10,
    skip: number = 0,
  ): Promise<IPaginatedData<VideoDocument>> {
    const user = Types.ObjectId.createFromHexString(userId);
    const [data, counts] = await Promise.all([
      this.videoModel
        .find({ user })
        .populate('user')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(take),
      this.videoModel.countDocuments({ user }),
    ]);

    const pagination = counts
      ? calculationPagination(counts, take, skip)
      : { totalPages: 0, currentPage: 0, next: false, prev: false, counts };

    return { data, pagination };
  }

  async findOne(id: string): Promise<VideoDocument> {
    const video = await this.videoModel
      .findById(id)
      .populate('user')
      .populate('category');
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  async update(
    id: string,
    updateVideoDto: UpdateVideoDto,
    owner: string,
    vide?: Express.Multer.File,
    thumbnail?: Express.Multer.File,
  ): Promise<VideoDocument> {
    const { category, ...videoData } = updateVideoDto;
    const input: Partial<Video> = {
      ...videoData,
      ...(category && {
        category: Types.ObjectId.createFromHexString(String(category)),
      }),
    };

    if (vide) {
      const { secure_url: url, public_id } = await upload(vide);
      input.url = url;
      input.public_id = public_id;
    }

    if (thumbnail) {
      console.log(thumbnail);
      const { secure_url: url, public_id } = await upload(thumbnail);
      input.thumbnail = { url, public_id };
    }

    const video = await this.videoModel.findOneAndUpdate(
      {
        _id: Types.ObjectId.createFromHexString(id),
        user: Types.ObjectId.createFromHexString(owner),
      },
      input,
      { returnDocument: 'after' },
    );

    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  async remove(id: string, owner: string): Promise<VideoDocument> {
    const video = await this.videoModel.findOneAndDelete({
      _id: Types.ObjectId.createFromHexString(id),
      user: Types.ObjectId.createFromHexString(owner),
    });
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }
}
