import { create } from "zustand";

/**
 * @module authStore
 * Manages authentication state (token, user, expiration).
 */

/**
 * The Zustand store to manage authentication-related data.
 *
 * @type {object}
 * @property {string|null} token - The authentication token of the user.
 * @property {string|null} timeExpiration - The expiration time of the token.
 * @property {object|null} user - The user data.
 * @property {function} setToken - A function to set the authentication token.
 * @property {function} clearToken - A function to clear the authentication token.
 * @property {function} setTimeExpiration - A function to set the token expiration time.
 * @property {function} clearTimeExpiration - A function to clear the token expiration time.
 * @property {function} setUser - A function to set the user data.
 * @property {function} clearUser - A function to clear the user data.
 */
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

/**
 * Custom hook to access the `token` from the store.
 *
 * @returns {string|null} The current token or null if no token is set.
 */
export const useToken = () => authStore((state) => state.token);

/**
 * Custom hook to set the `token` in the store.
 *
 * @returns {function} A function that sets the token in the store.
 */
export const useSetToken = () => authStore((state) => state.setToken);

/**
 * Custom hook to clear the `token` from the store.
 *
 * @returns {function} A function that clears the token from the store.
 */
export const useClearToken = () => authStore((state) => state.clearToken);

/**
 * Custom hook to access the `user` from the store.
 *
 * @returns {object|null} The current user data or null if no user is set.
 */
export const useUser = () => authStore((state) => state.user);

/**
 * Custom hook to set the `user` in the store.
 *
 * @returns {function} A function that sets the user data in the store.
 */
export const useSetUser = () => authStore((state) => state.setUser);

/**
 * Custom hook to clear the `user` from the store.
 *
 * @returns {function} A function that clears the user data from the store.
 */
export const useClearUser = () => authStore((state) => state.clearUser);

/**
 * Custom hook to access the `timeExpiration` from the store.
 *
 * @returns {string|null} The current time expiration or null if no expiration is set.
 */
export const useTimeExpiration = () => authStore((state) => state.timeExpiration);

/**
 * Custom hook to set the `timeExpiration` in the store.
 *
 * @returns {function} A function that sets the time expiration in the store.
 *
 * @note This function should not be executed directly. Instead, use it to
 * set the expiration time for the authentication token.
 */
export const useSetTimeExpiration = () => authStore((state) => state.setTimeExpiration);

export const useClearTimeExpiration = () => authStore((state) => state.clearTimeExpiration);


/**
 * Custom hook to clear the `timeExpiration` from the store.
 *
 * @returns {function} A function that clears the time expiration from the store.
 *
 * @note This function should not be executed directly. Instead, use it to
 * clear the expiration time for the authentication token.
 */
// Is necesary doc this functions
export const useSetRenewToken = () => authStore((state) => state.setRenewToken); // Change the boolean
export const useEditUser = () => authStore((state) => state.editUser); // Access to boolean
export const useSetEditUser = () => authStore((state) => state.setEditUser); // Change the boolean
export const useDarkMode = () => authStore((state) => state.darkMode); // Access to boolean
export const setUseDarkMode = () => authStore((state) => state.setDarkMode); // Change the boolean
