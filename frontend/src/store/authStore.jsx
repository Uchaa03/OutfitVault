import { create } from "zustand";

export const authStore = create((set) => ({
    token: null, // Initial State
    timeExpiration: null,
    user: null, // Initial State
    renewToken: false, // Initial State
    editUser: false,
    darkMode: false,
    setToken: (newToken) => set({ token: newToken }),
    clearToken: () => set({ token: null }),
    setTimeExpiration: (newTimeExpiration) => set({ timeExpiration: newTimeExpiration }),
    clearTimeExpiration: () => set({ timeExpiration: null }),
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
    setRenewToken: (renewToken) => set({ renewToken: renewToken }),
    setEditUser: (newUser) => set({ editUser: newUser }),
    setDarkMode: (darkMode) => set({ darkMode: darkMode }),



}));

// Hooks for call store functions
export const useToken = () => authStore((state) => state.token); // Access to token
export const useSetToken = () => authStore((state) => state.setToken); // Set token
export const useClearToken = () => authStore((state) => state.clearToken); // Delete token
export const useUser = () => authStore((state) => state.user); // Access to user
export const useSetUser = () => authStore((state) => state.setUser); // Set user
export const useClearUser = () => authStore((state) => state.clearUser); // Delete user
export const useTimeExpiration = () => authStore((state) => state.timeExpiration); // Access to time expiration
export const useSetTimeExpiration = () => authStore((state) => state.setTimeExpiration); // NO ejecutar la función aquí
export const useClearTimeExpiration = () => authStore((state) => state.clearTimeExpiration); // NO ejecutar la función aquí
export const useRenewToken = () => authStore((state) => state.renewToken); // Access to boolean
export const useSetRenewToken = () => authStore((state) => state.setRenewToken); // Change the boolean
export const useEditUser = () => authStore((state) => state.editUser); // Access to boolean
export const useSetEditUser = () => authStore((state) => state.setEditUser); // Change the boolean
export const useDarkMode = () => authStore((state) => state.darkMode); // Access to boolean
export const setUseDarkMode = () => authStore((state) => state.setDarkMode); // Change the boolean
