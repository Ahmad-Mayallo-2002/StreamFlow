import { Controller, Req, UseGuards, Get, Res, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../common/user/user.decorator';
import type { Payload } from '../types/payload.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cachManager: Cache,
  ) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleLogin() {}

  @Get('auth/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const tokens = await this.authService.googleLogin(user);
    res
      .cookie('accessToken', tokens.accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      })
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      })
      .cookie('id', `${user?._id?.toString()}`, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      });

    return res.redirect('http://localhost:5173/');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@User() user: Payload) {
    const cachedProfile = await this.cachManager.get('profile');
    if (cachedProfile) return cachedProfile;
    else {
      const profile = await this.authService.findByGoogleId(user.sub1);
      await this.cachManager.set('profile', profile, 1000 * 60 * 15);
      return profile;
    }
  }
}
