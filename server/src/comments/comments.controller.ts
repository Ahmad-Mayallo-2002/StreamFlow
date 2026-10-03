import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  DefaultValuePipe,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { type Request } from 'express';
import { Payload } from '../types/payload.type';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('videos/:videoId')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('videoId', IsObjectIdPipe) videoId: string,
    @Req() req: Request,
  ) {
    const author = (req.user as Payload).sub2;
    return this.commentsService.create(createCommentDto, author, videoId);
  }

  @Get()
  findAll(
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: string,
  ) {
    return this.commentsService.findAll(+skip, +take);
  }

  @Get('videos/:videoId')
  async findVideoComments(
    @Param('videoId') videoId: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: string,
    @Query('sort', new DefaultValuePipe('desc')) sort: 'desc' | 'asc',
  ) {
    return await this.commentsService.findVideoComments(
      videoId,
      +skip,
      +take,
      sort,
    );
  }

  @Get(':id')
  findOne(@Param('id', IsObjectIdPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.commentsService.remove(id);
  }
}
