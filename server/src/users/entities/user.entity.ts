import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDoc = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  displayName!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({ type: String, required: true, unique: true, sparse: true })
  googleId!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
