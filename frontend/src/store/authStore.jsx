import { create } from "zustand";

const authStore = create((set) => ({
    token: null, // Initial State
    user: null, // Initial State
    setToken: (newToken) => set({ token: newToken }),
    clearToken: () => set({ token: null }),
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
}));

// Hooks for call store functions
export const useToken = () => authStore((state) => state.token); // Access to token
export const useSetToken = () => authStore((state) => state.setToken); // Set token
export const useClearToken = () => authStore((state) => state.clearToken); // Delete token
export const useUser = () => authStore((state) => state.user); // Access to user
export const useSetUser = () => authStore((state) => state.setUser); // Set user
export const useClearUser = () => authStore((state) => state.clearUser); // Delete user