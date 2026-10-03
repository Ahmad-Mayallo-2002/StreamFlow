import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PlayList } from '../../play-list/entities/play-list.entity';
import { Video } from '../../videos/entities/video.entity';

export type PlayListVideoDocument = HydratedDocument<PlayListVideo>;

@Schema({ collection: 'playListVideo', timestamps: true })
export class PlayListVideo {
  @Prop({ type: Types.ObjectId, required: true, ref: PlayList.name })
  playList!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Video.name,
    required: true,
  })
  video!: Types.ObjectId;
}

export const PlayListVideoSchema = SchemaFactory.createForClass(PlayListVideo);
