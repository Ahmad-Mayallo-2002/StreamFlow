import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WatchLaterVideoState {
  watchLaterVideoId: string;
  setWatchLaterVideo: (id: string) => void;
}

export const watchLaterVideoState = create<WatchLaterVideoState>()(
  persist(
    (set) => ({
      watchLaterVideoId: "",
      setWatchLaterVideo: (id) => set({ watchLaterVideoId: id }),
    }),
    {
      name: "watchLaterVideoState",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
