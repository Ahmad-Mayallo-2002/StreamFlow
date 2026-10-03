import type { Category } from "./category";
import type { Document } from "./document";
import type { User } from "./user";

export interface Video extends Document {
  _id: string;
  title: string;
  description?: string;
  category: Category;
  user: User;
  url: string;
  public_id: string;
  thumbnail: {
    url: string;
    public_id: string;
  };
}
