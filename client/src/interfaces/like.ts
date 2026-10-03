import type { Document } from "./document";
import type { User } from "./user";
import type { Video } from "./video";

export interface Like extends Document {
  user: User;
  video: Video;
  isLiked: boolean;
  isDisliked: boolean;
}
