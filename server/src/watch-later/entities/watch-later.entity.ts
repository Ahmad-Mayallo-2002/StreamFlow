import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WatchLaterDocument = HydratedDocument<WatchLater>;

@Schema({
  collection: 'watchLater',
  timestamps: true,
})
export class WatchLater {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    unique: true,
  })
  owner!: Types.ObjectId;
}

export const WatchLaterSchema = SchemaFactory.createForClass(WatchLater);
