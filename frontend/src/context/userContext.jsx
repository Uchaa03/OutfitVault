import { createContext, useContext, useEffect } from "react";
import { useToken, useSetToken, useClearToken, useUser, useSetUser, useClearUser } from "../store/authStore.jsx";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const token = useToken();
    const setToken = useSetToken();
    const clearToken = useClearToken();
    const user = useUser();
    const setUser = useSetUser();
    const clearUser = useClearUser();

    useEffect(() => {
        if (token) {
            // Aquí puedes agregar lógica para obtener los datos del usuario usando el token
            setUser({ token }); // Simula la obtención de datos del usuario
            console.log("El token ha cambiado:", token);
        } else {
            clearUser();
        }
    }, [token, setUser, clearUser]);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        clearToken();
        clearUser();
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;