import { create } from "zustand";

interface PlaylistVideoState {
  playlistVideoId: string;
  setPlaylistVideo: (id: string) => void;
}

export const playlistVideoState = create<PlaylistVideoState>((set) => ({
  playlistVideoId: "",
  setPlaylistVideo: (id) => set(() => ({ playlistVideoId: id })),
}));
