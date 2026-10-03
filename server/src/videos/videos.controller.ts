import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosService } from './videos.service';
import { type Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { User } from '../common/user/user.decorator';
import type { Payload } from '../types/payload.type';
import { Types } from 'mongoose';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  @Post()
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFiles()
    files: {
      video: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
    },
    @Req() req: Request,
  ) {
    const user = req.user as Payload;

    const video = files.video?.[0];
    const thumbnail = files.thumbnail?.[0];
    const input = {
      ...createVideoDto,
      user: Types.ObjectId.createFromHexString(user.sub2),
    };

    return await this.videosService.create(input, video, thumbnail);
  }

  @Get()
  findAll(
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: string,
    @Query('category') category: string,
    @Query('search') search: string,
  ) {
    return this.videosService.findAll(
      Number(skip),
      Number(take),
      category,
      search,
    );
  }

  @Get('users/:id')
  findUserVideos(
    @Param('id', IsObjectIdPipe) id: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    return this.videosService.findUserVideos(id, take, skip);
  }

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.videosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  update(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() updateVideoDto: UpdateVideoDto,
    @User() user: Payload,
    @UploadedFiles()
    files: {
      video: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
    },
  ) {
    const video = files.video?.[0];
    const thumbnail = files.thumbnail?.[0];

    return this.videosService.update(
      id,
      updateVideoDto,
      user.sub2,
      video,
      thumbnail,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string, @User() user: Payload) {
    return this.videosService.remove(id, user.sub2);
  }
}
