import { create } from "zustand";

interface SearchBoxToggle {
  isVisible: boolean;
  setVisible: () => void;
}

export const searchBoxToggle = create<SearchBoxToggle>((set) => ({
  isVisible: true,
  setVisible: () => set((state) => ({ isVisible: !state.isVisible })),
}));
