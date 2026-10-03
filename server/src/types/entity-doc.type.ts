import { Document } from 'mongoose';

export type EntityDoc<T> = T & Document;
