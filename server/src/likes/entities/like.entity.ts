import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true, collection: 'likes' })
export class Like {
  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  isLiked!: boolean;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  isDisliked!: boolean;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Video',
  })
  video!: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  user!: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
