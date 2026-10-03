import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityDoc } from '../../types/entity-doc.type';

export type CategoryDoc = EntityDoc<Category>;

@Schema({ collection: 'categories', timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name!: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
