import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/protected')
  @UseGuards(JwtAuthGuard)
  sayHello(@Req() req: Request) {
    return req.user;
  }
}
