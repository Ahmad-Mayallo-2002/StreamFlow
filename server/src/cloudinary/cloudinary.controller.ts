import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { Payload } from '../types/payload.type';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @UseGuards(JwtAuthGuard)
  @Get('video-signature')
  getVideoSignature(@Req() req: Request) {
    const user = req.user as Payload;
    return this.cloudinaryService.createVideoUploadSignature(user.sub2);
  }
}
