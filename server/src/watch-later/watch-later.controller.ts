/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { WatchLaterService } from './watch-later.service';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { WatchLaterVideoService } from '../watch-later-video/watch-later-video.service';

@Controller('watch-later')
export class WatchLaterController {
  constructor(
    private readonly watchLaterService: WatchLaterService,
    private readonly watchLaterVideoService: WatchLaterVideoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async findUserWatchLater(@Req() req: Request) {
    const id: string = (req?.user as any).sub2;
    return await this.watchLaterService.findUserWatchLater(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/videos/:id')
  async addToWatchLater(
    @Param('id', IsObjectIdPipe) id: string,
    @Req() req: Request,
  ) {
    const userId: string = (req?.user as any).sub2;
    return await this.watchLaterService.addToWatchLater(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/videos/:id')
  async removeFromWatchLater(@Param('id', IsObjectIdPipe) id: string) {
    return await this.watchLaterVideoService.remove(id);
  }
}
