import { create } from "zustand";

interface VideosCounts {
  videosCounts: number;
  setVideosCounts: (count: number) => void;
}

export const useVideosCounts = create<VideosCounts>((set) => ({
  videosCounts: 0,
  setVideosCounts: (videosCounts) => set(() => ({ videosCounts })),
}));
