import { create } from "zustand";

interface Category {
  category: string;
  setCategory: (value: string) => void;
}

export const useCategory = create<Category>((set) => ({
  category: "",
  setCategory: (category: string) => set(() => ({ category })),
}));
