import useAuthStore from "../store/authStore.jsx";

export const token = () => useAuthStore((state) => state.token); //Access to token
export const setToken = () => useAuthStore((state) => state.setToken); //Update token
export const clearToken = () => useAuthStore((state) => state.clearToken); //Delete token