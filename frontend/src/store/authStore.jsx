import { create } from "zustand";

const authStore = create((set) => ({
    token: null, // Initial State
    setToken: (newToken) => set({ token: newToken }),
    clearToken: () => set({ token: null }),
}));

//Hooks for call store functions
export const useToken = () => authStore((state) => state.token); // Access to token
export const useSetToken = () => authStore((state) => state.setToken); // Set token
export const useClearToken = () => authStore((state) => state.clearToken); // Delete token