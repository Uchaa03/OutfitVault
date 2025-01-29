import { createContext, useContext, useEffect } from "react";
import {
    useToken,
    useSetToken,
    useClearToken,
    useUser,
    useSetUser,
    useClearUser,
    useTimeExpiration, useSetTimeExpiration, useClearTimeExpiration
} from "../store/authStore.jsx";

/**
 * UserContext is used to manage the user session, including authentication token, user data,
 * and session expiration. It provides login and logout functionality, as well as restoring
 * session data from localStorage.
 */
const UserContext = createContext();

/**
 * The UserProvider component provides the user context to its children.
 * It tracks the authentication token, user data, and session expiration, storing them in
 * localStorage and restoring them upon component mount.
 *
 * @param {React.ReactNode} children - The children components to be wrapped by the context provider.
 * @returns {JSX.Element} The context provider wrapping the children components.
 */
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

    /**
     * useEffect hook to store the token, user data, and expiration time in localStorage
     * whenever the token or expiration time changes.
     */
    useEffect(() => {
        if (token && timeExpiration) { // Save data in local storage
            console.log("Datos en local storage");
            localStorage.setItem("authToken", token);
            localStorage.setItem("timeExpiration", timeExpiration.toISOString());
            localStorage.setItem("username", user);
        }
    }, [token, timeExpiration]);

    /**
     * useEffect hook to retrieve and restore session data from localStorage upon component mount.
     * If session data is present, it sets the token, user, and expiration time.
     * If session data is missing, it clears any existing session state.
     */
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedTimeExpiration = localStorage.getItem("timeExpiration");
        const storedUsername = localStorage.getItem("username");

        if (storedToken && storedTimeExpiration && storedUsername) {
            const expirationDate = new Date(storedTimeExpiration);

            // Restore session
            setToken(storedToken);
            setTimeExpiration(expirationDate);
            setUser(storedUsername);
        } else {
            // Clean data if empty
            clearToken();
            clearUser();
            clearTimeExpiration();
        }
    }, [setToken, setTimeExpiration, setUser, clearToken, clearUser, clearTimeExpiration]);

    /**
     * Logs the user in by setting the authentication token, user data, and expiration time.
     * It also updates the session state and localStorage.
     *
     * @param {string} newToken - The new authentication token.
     * @param {string} userData - The username of the authenticated user.
     */
    const login = (newToken, userData) => {
        const dateExpiration = new Date();
        dateExpiration.setHours(dateExpiration.getHours() + 1);
        setToken(newToken);
        setUser(userData);
        setTimeExpiration(dateExpiration);
    };

    /**
     * Logs the user out by clearing the authentication token, user data, and expiration time.
     * It also removes session data from localStorage.
     */
    const logout = () => {
        clearToken();
        clearUser();
        clearTimeExpiration();
        // Delete from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("timeExpiration");
        localStorage.removeItem("username");
    };

    return (
      <UserContext.Provider value={{ user, login, logout }}>
          {children}
      </UserContext.Provider>
    );
};

/**
 * Custom hook to use the UserContext.
 *
 * @returns {Object} The user context value containing the user data, login, and logout methods.
 */
export const useUserContext = () => useContext(UserContext);

export default UserContext;
