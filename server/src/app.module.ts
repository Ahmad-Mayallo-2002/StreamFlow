import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { LikesModule } from './likes/likes.module';
import { WatchLaterModule } from './watch-later/watch-later.module';
import { PlayListModule } from './play-list/play-list.module';
import { PlayListVideoModule } from './play-list-video/play-list-video.module';
import { WatchLaterVideoModule } from './watch-later-video/watch-later-video.module';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGO_URL}`, {
      dbName: 'youtube_clone',
    }),
    CacheModule.register({ isGlobal: true }),
    AuthModule,
    UsersModule,
    VideosModule,
    CommentsModule,
    CategoriesModule,
    LikesModule,
    WatchLaterModule,
    PlayListModule,
    PlayListVideoModule,
    WatchLaterVideoModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
