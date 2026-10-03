import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  Body,
  Post,
  DefaultValuePipe,
} from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePlayListDto } from './dto/create-play-list.dto';
import { User } from '../common/user/user.decorator';
import type { Payload } from '../types/payload.type';

@Controller('play-list')
export class PlayListController {
  constructor(private readonly playListService: PlayListService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() input: CreatePlayListDto, @User() user: Payload) {
    return await this.playListService.create(input, user.sub2);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:id')
  async findUserPlayLists(
    @Param('id', IsObjectIdPipe) id: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    const { data, pagination } = await this.playListService.findUserPlayLists(
      id,
      take,
      skip,
    );
    return { data, pagination };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', IsObjectIdPipe) id: string, @User() user: Payload) {
    return await this.playListService.remove(id, user.sub2);
  }
}
