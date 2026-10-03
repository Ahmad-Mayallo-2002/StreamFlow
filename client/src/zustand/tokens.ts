import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Token {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const accessToken = create<Token>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: "" }),
    }),
    { name: "accessToken" },
  ),
);

export const refreshToken = create<Token>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: "" }),
    }),
    { name: "refreshToken" },
  ),
);
