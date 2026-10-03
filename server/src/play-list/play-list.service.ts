import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayList, PlayListDocument } from './entities/play-list.entity';
import { Model, Types } from 'mongoose';
import { calculationPagination } from '../common/calculationPagination';
import { CreatePlayListDto } from './dto/create-play-list.dto';

@Injectable()
export class PlayListService {
  constructor(
    @InjectModel(PlayList.name)
    private readonly playListModel: Model<PlayListDocument>,
  ) {}

  async create(input: CreatePlayListDto, owner: string) {
    return (
      await this.playListModel.create({
        ...input,
        owner: Types.ObjectId.createFromHexString(owner),
      })
    ).save();
  }

  async findById(id: string) {
    const playlist = await this.playListModel.findById(id);
    if (!playlist) throw new NotFoundException('No playlist found');
    return playlist;
  }

  async findUserPlayLists(owner: string, take: number = 10, skip: number = 0) {
    const [playList, counts] = await Promise.all([
      this.playListModel
        .find({
          owner: Types.ObjectId.createFromHexString(owner),
        })
        .limit(take)
        .skip(skip),
      this.playListModel.countDocuments({
        owner: Types.ObjectId.createFromHexString(owner),
      }),
    ]);
    if (!counts) throw new NotFoundException('No playlist found');
    const pagination = calculationPagination(counts, take, skip);
    return { data: playList, pagination };
  }

  async remove(id: string, owner: string) {
    const playlist = await this.playListModel.findOneAndDelete({
      _id: Types.ObjectId.createFromHexString(id),
      owner: Types.ObjectId.createFromHexString(owner),
    });
    if (!playlist) throw new NotFoundException('No playlist found');
    return playlist;
  }
}
