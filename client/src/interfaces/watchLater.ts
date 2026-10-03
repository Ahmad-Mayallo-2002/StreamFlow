import type { Document } from "./document";
import type { User } from "./user";
import type { Video } from "./video";

export interface WatchLater extends Document {
  title: string;
  owner: User;
}

export interface WatchLaterVideo extends Document {
  video: Video;
  watchLater: WatchLater;
}
