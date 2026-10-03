import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

export class Thumbnail {
  url!: string;
  public_id!: string;
}

@Schema({ timestamps: true, collection: 'videos' })
export class Video {
  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  title!: string;

  @Prop({
    required: false,
    type: String,
    maxlength: 5000,
    trim: true,
  })
  description?: string;

  @Prop({
    required: true,
    type: String,
  })
  url!: string;

  @Prop({
    required: true,
    type: String,
  })
  public_id!: string;

  @Prop({
    required: true,
    type: Thumbnail,
    _id: false,
    __v: false,
  })
  thumbnail!: Thumbnail;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Category',
  })
  category!: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  user!: Types.ObjectId;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
