import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useSearch = create<SearchState>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (query: string) => set({ query }),
      clearQuery: () => set({ query: "" }),
    }),
    {
      name: "searchState",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
