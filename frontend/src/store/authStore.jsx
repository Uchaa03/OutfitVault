import {create} from "zustand";

const useAuthStore = create((set) => ({ //Create store
    token: null, // assign variable
    setToken: (newToken) => set({ token: newToken}), //Function for update token
    clearToken: (newToken) => set({ token: newToken}), //For clear token
}))

export default useAuthStore