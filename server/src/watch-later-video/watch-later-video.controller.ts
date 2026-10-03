import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { WatchLaterVideoService } from './watch-later-video.service';
import { CreateWatchLaterVideoDto } from './dto/create-watch-later-video.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('watch-later-video')
export class WatchLaterVideoController {
  constructor(
    private readonly watchLaterVideoService: WatchLaterVideoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWatchLaterVideoDto: CreateWatchLaterVideoDto) {
    return this.watchLaterVideoService.create(createWatchLaterVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', IsObjectIdPipe) id: string) {
    return this.watchLaterVideoService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('video/:id')
  getById(@Param('id', IsObjectIdPipe) id: string) {
    return this.watchLaterVideoService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':watchLaterId')
  async getWatchLaterVideos(
    @Param('watchLaterId', IsObjectIdPipe) watchLaterId: string,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
  ) {
    return await this.watchLaterVideoService.getWatchLaterVideos(
      watchLaterId,
      take,
      skip,
    );
  }
}
