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
        if (token && timeExpiration) { //Save data in local storage
            console.log("Datos en local storage")
            localStorage.setItem("authToken", token)
            localStorage.setItem("timeExpiration", timeExpiration.toISOString())
            localStorage.setItem("username", user)
        }
    }, [token, timeExpiration]);

    useEffect(() => {
        // Get data from local storage
        const storedToken = localStorage.getItem("authToken");
        const storedTimeExpiration = localStorage.getItem("timeExpiration")
        const storedUsername = localStorage.getItem("username");

        if (storedToken && storedTimeExpiration && storedUsername) {
            //Convert data to js
            const expirationDate = new Date(storedTimeExpiration);
            // Restore session
            setToken(storedToken);
            setTimeExpiration(expirationDate);
            setUser(storedUsername);
        } else {
            // Clean data is empty
            clearToken();
            clearUser();
            clearTimeExpiration();
        }
    }, [setToken, setTimeExpiration, setUser, clearToken, clearUser, clearTimeExpiration]);


    const login = (newToken, userData) => {
        const dateExpiration =  new Date()
        dateExpiration.setHours(dateExpiration.getHours() + 1);
        setToken(newToken);
        setUser(userData);
        setTimeExpiration(dateExpiration);

    };

    const logout = () => {
        clearToken()
        clearUser()
        clearTimeExpiration()
        //Delete from localstorage
        localStorage.removeItem("authToken")
        localStorage.removeItem("timeExpiration")
        localStorage.removeItem("username")
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);