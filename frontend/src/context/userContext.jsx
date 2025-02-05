import { createContext, useContext, useEffect } from "react";
import {
    useToken,
    useSetToken,
    useClearToken,
    useUser,
    useSetUser,
    useClearUser,
    useTimeExpiration,
    useSetTimeExpiration,
    useClearTimeExpiration
} from "../store/authStore.jsx";

/**
 * UserContext is used to manage the user session, including authentication token, user data,
 * and session expiration.
 */
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const token = useToken();
    const setToken = useSetToken();
    const clearToken = useClearToken();
    const user = useUser();
    const setUser = useSetUser();
    const clearUser = useClearUser();
    const timeExpiration = useTimeExpiration();
    const setTimeExpiration = useSetTimeExpiration();
    const clearTimeExpiration = useClearTimeExpiration();

    useEffect(() => {
        if (token && timeExpiration) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("timeExpiration", timeExpiration.toISOString());
            localStorage.setItem("username", user);
        }
    }, [token, timeExpiration, user]);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedTimeExpiration = localStorage.getItem("timeExpiration");
        const storedUsername = localStorage.getItem("username");

        if (storedToken && storedTimeExpiration && storedUsername) {
            const expirationDate = new Date(storedTimeExpiration);
            setToken(storedToken);
            setTimeExpiration(expirationDate);
            setUser(storedUsername);
        } else {
            clearToken();
            clearUser();
            clearTimeExpiration();
        }
    }, [setToken, setTimeExpiration, setUser, clearToken, clearUser, clearTimeExpiration]);

    const login = (newToken, userData) => {
        const dateExpiration = new Date();
        dateExpiration.setHours(dateExpiration.getHours() + 1);
        setToken(newToken);
        setUser(userData);
        setTimeExpiration(dateExpiration);
    };

    const logout = () => {
        try {

        
        clearToken();
        clearUser();
        clearTimeExpiration();
        localStorage.removeItem("authToken");
        localStorage.removeItem("timeExpiration");
        localStorage.removeItem("username");
        
        window.location.href = "/";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);