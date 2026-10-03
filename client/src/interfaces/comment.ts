import type { Document } from "./document";
import type { Video } from "./video";
import type { User } from "./user";

export interface Comment extends Document {
  content: string;
  author: User;
  video: Video;
}
