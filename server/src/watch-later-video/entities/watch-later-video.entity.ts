import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WatchLater } from '../../watch-later/entities/watch-later.entity';
import { Video } from '../../videos/entities/video.entity';

export type WatchLaterVideoDocument = HydratedDocument<WatchLaterVideo>;

@Schema({ collection: 'watchLaterVideos', timestamps: true })
export class WatchLaterVideo {
  @Prop({
    type: Types.ObjectId,
    ref: WatchLater.name,
    required: true,
  })
  watchLater!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Video.name,
    required: true,
  })
  video!: Types.ObjectId;
}

export const WatchLaterVideoSchema =
  SchemaFactory.createForClass(WatchLaterVideo);
