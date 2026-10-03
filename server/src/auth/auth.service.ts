/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDoc } from '../users/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDoc>,
  ) {}

  async validateGoogleUser(data: Profile) {
    let user = await this.userModel.findOne({ googleId: data.id });

    if (user) return user;

    user = await this.userModel.findOne({ email: data.emails?.[0].value });

    if (user) {
      user.googleId = data.id;
      return await this.userModel.updateOne({ googleId: data.id }, user);
    }

    return this.userModel.create({
      displayName: data.displayName,
      email: data.emails?.[0].value,
      image: data.photos?.[0].value,
      googleId: data.id,
    });
  }

  async googleLogin(user: any) {
    const payload = {
      sub1: user.googleId,
      email: user.email,
      sub2: user._id,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async findByGoogleId(googleId: string): Promise<UserDoc> {
    const user = await this.userModel.findOne({ googleId });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
