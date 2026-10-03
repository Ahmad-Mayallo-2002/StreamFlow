import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { User } from '../common/user/user.decorator';
import type { Payload } from '../types/payload.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('videos/:videoId')
  async getVideoReacts(@Param('videoId', IsObjectIdPipe) videoId: string) {
    return await this.likesService.getVideoReacts(videoId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/videos/:videoId')
  async getUserReact(
    @Param('videoId', IsObjectIdPipe) videoId: string,
    @User() user: Payload,
  ) {
    return await this.likesService.getUserReact(user.sub2, videoId);
  }

  @Get('users/:userId/videos')
  async getUserLikedVideos(
    @Param('userId', IsObjectIdPipe) userId: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    return await this.likesService.getUserLikedVideos(userId, take, skip);
  }

  @UseGuards(JwtAuthGuard)
  @Post('videos/:videoId/like')
  async addLike(
    @Param('videoId', IsObjectIdPipe) videoId: string,
    @User() user: Payload,
  ) {
    return await this.likesService.addLike(videoId, user.sub2);
  }

  @UseGuards(JwtAuthGuard)
  @Post('videos/:videoId/dislike')
  async addDislike(
    @Param('videoId', IsObjectIdPipe) videoId: string,
    @User() user: Payload,
  ) {
    return await this.likesService.addDislike(videoId, user.sub2);
  }
}
