import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PlayListDocument = HydratedDocument<PlayList>;

@Schema({
  collection: 'playLists',
  timestamps: true,
})
export class PlayList {
  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  title!: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    unique: false,
  })
  owner!: Types.ObjectId;
}

export const PlayListSchema = SchemaFactory.createForClass(PlayList);
