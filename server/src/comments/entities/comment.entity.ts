import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, collection: 'comments' })
export class Comment {
  @Prop({
    required: true,
    type: String,
    maxlength: 5000,
    trim: true,
  })
  content!: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  author!: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Video',
  })
  video!: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
