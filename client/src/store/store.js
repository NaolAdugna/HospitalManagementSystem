import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    password: "",
    active: false,
  },
  setUsername: (username) =>
    set((state) => ({ auth: { ...state.auth, username: username } })),
}));
