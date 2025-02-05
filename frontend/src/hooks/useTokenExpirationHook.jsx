import { useEffect, useState } from 'react';
import { useUserContext } from "../context/userContext.jsx";
import {
    authStore,
    useSetRenewToken,
    useTimeExpiration,
} from "../store/authStore.jsx";

const useTokenExpirationHook = () => {
    const { logout } = useUserContext();
    const [showWarning, setShowWarning] = useState(false);
    const expirationDate = useTimeExpiration();
    const setRenewToken = useSetRenewToken();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsActive(!document.hidden);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    useEffect(() => {
        if (!expirationDate || !isActive) return;

        const expirationTime = expirationDate.getTime() - Date.now();

        if (expirationTime <= 0) {
            setShowWarning(false);
            localStorage.removeItem("authToken");
            logout();
            return;
        }

        const warningTimeout = setTimeout(() => {
            setShowWarning(true);

            const logoutTimeout = setTimeout(() => {
                const renewToken = authStore.getState().renewToken;
                if (renewToken) {
                    setRenewToken(false);
                    setShowWarning(false);
                } else {
                    setShowWarning(false);
                    logout();
                }
            }, 60000);

            return () => clearTimeout(logoutTimeout);
        }, Math.max(0, expirationTime - 60000));

        return () => clearTimeout(warningTimeout);
    }, [expirationDate, logout, setRenewToken, isActive]);

    return { showWarning, setShowWarning };
};

export default useTokenExpirationHook;