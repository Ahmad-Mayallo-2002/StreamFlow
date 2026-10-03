import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calculationPagination } from '../common/calculationPagination';
import { IPaginatedData } from '../interfaces/paginatedData.interface';
import { User, UserDoc } from './entities/user.entity';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async findAll(skip: number, take: number): Promise<IPaginatedData<UserDoc>> {
    const [data, counts] = await Promise.all([
      this.userModel.find().sort({ createdAt: -1 }).skip(skip).limit(take),
      this.userModel.countDocuments(),
    ]);

    if (data.length === 0) throw new NotFoundException('No users found');

    const pagination = calculationPagination(counts, take, skip);

    return { data, pagination };
  }

  async findOne(id: string): Promise<UserDoc> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string): Promise<UserDoc> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<UserDoc> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
