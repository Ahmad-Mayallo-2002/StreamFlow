import type { Document } from "./document";
import type { User } from "./user";
import type { Video } from "./video";

export interface PlayList extends Document {
  title: string;
  owner: User;
}

export interface PlayListVideo extends Document {
  video: Video;
  playList: PlayList;
}
