import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { calculationPagination } from '../common/calculationPagination';
import { IPaginatedData } from '../interfaces/paginatedData.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    author: string,
    video: string,
  ): Promise<CommentDocument> {
    return await new this.commentModel({
      ...createCommentDto,
      author: Types.ObjectId.createFromHexString(author),
      video: Types.ObjectId.createFromHexString(video),
    }).save();
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<IPaginatedData<CommentDocument>> {
    const [data, counts] = await Promise.all([
      this.commentModel.find().sort({ createdAt: -1 }).skip(skip).limit(take),
      this.commentModel.countDocuments(),
    ]);

    const pagination = calculationPagination(counts, take, skip);

    return { data, pagination };
  }

  async findVideoComments(
    videoId: string,
    skip: number,
    take: number,
    sort: 'desc' | 'asc' = 'desc',
  ): Promise<IPaginatedData<CommentDocument>> {
    const video = Types.ObjectId.createFromHexString(videoId);
    const [data, counts] = await Promise.all([
      this.commentModel
        .find({ video })
        .populate('author')
        .sort({ createdAt: sort })
        .skip(skip)
        .limit(take),
      this.commentModel.countDocuments({ video }),
    ]);

    if (!counts)
      throw new NotFoundException('No comments for this video found');

    const pagination = calculationPagination(counts, take, skip);

    return { data, pagination };
  }

  async findOne(id: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(id).exec();
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDocument> {
    const comment = await this.commentModel.findByIdAndUpdate(
      id,
      updateCommentDto,
      {
        returnDocument: 'after',
      },
    );
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async remove(id: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findByIdAndDelete(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }
}
