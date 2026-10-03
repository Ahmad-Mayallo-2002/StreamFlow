import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { PlayListVideoService } from './play-list-video.service';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('playlist-video')
export class PlayListVideoController {
  constructor(private readonly playListVideoService: PlayListVideoService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':videoId/:playlistId')
  create(
    @Param('videoId', IsObjectIdPipe) videoId: string,
    @Param('playlistId', IsObjectIdPipe) playlistId: string,
  ) {
    return this.playListVideoService.create(videoId, playlistId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.playListVideoService.remove(id);
  }

  @Get('video/:id')
  getById(@Param('id', IsObjectIdPipe) id: string) {
    return this.playListVideoService.getById(id);
  }

  @Get(':playlistId')
  async getPlaylistVideos(
    @Param('playlistId', IsObjectIdPipe) playlistId: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    return await this.playListVideoService.getPlaylistVideos(
      playlistId,
      take,
      skip,
    );
  }
}
