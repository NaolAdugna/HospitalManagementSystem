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
export const usePatientAuthStore = create((set) => ({
  auth: {
    name: "",
    password: "",
    active: false,
  },
  setName: (name) => set((state) => ({ auth: { ...state.auth, name: name } })),
}));
