import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calculationPagination } from '../common/calculationPagination';
import { IPaginatedData } from '../interfaces/paginatedData.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDoc } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDoc>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDoc> {
    return await new this.categoryModel(createCategoryDto).save();
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<IPaginatedData<CategoryDoc>> {
    const [data, counts] = await Promise.all([
      this.categoryModel.find().sort({ createdAt: -1 }).skip(skip).limit(take),
      this.categoryModel.countDocuments(),
    ]);
    const pagination = calculationPagination(counts, take, skip);

    return { data, pagination };
  }

  async findOne(id: string): Promise<CategoryDoc> {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDoc> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        returnDocument: 'after',
      },
    );

    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async remove(id: string): Promise<CategoryDoc> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
