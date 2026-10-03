/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { accessToken, refreshToken } = request.cookies;

    if (accessToken) {
      try {
        const payload = this.jwtService.verify(accessToken as string, {
          secret: process.env.JWT_ACCESS_SECRET!,
        });

        request['user'] = payload;
        return true;
      } catch {
        /* empty */
      }
    }

    if (!refreshToken)
      throw new UnauthorizedException(
        'Access token expired and no refresh token provided',
      );

    try {
      const refreshPayload = this.jwtService.verify(refreshToken as string, {
        secret: process.env.JWT_REFRESH_SECRET!,
      });

      // Optional: Verify hashed refresh token against your DB here if storing tokens
      // await this.userService.verifyRefreshToken(refreshPayload.sub, refreshToken);

      // 3. Refresh Token is valid -> Generate NEW Access Token
      const newPayload = {
        sub1: refreshPayload.sub1,
        email: refreshPayload.email,
        sub2: refreshPayload.sub2,
      };
      const newAccessToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_ACCESS_SECRET || 'access-secret',
        expiresIn: '15m',
      });

      // Send the new access token back to the client via response header
      response.setHeader('x-new-access-token', newAccessToken);

      // Attach user payload to request
      request['user'] = newPayload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
