import { useEffect, useState } from 'react';
import { useUserContext } from "../context/userContext.jsx";
import {
    useRenewToken,
    useSetRenewToken,
    useTimeExpiration,
} from "../store/authStore.jsx";

const useTokenExpirationHook = () => {
    const { logout } = useUserContext();
    const [showWarning, setShowWarning] = useState(false); // For showing the renew token or close session box
    const expirationDate = useTimeExpiration();
    const setRenewToken = useSetRenewToken()
    const renewToken = useRenewToken()

    useEffect(() => {
        if (!expirationDate) return;
        console.log(expirationDate)
        const expirationTime = expirationDate.getTime() - Date.now(); // Get actual time for expiration
        console.log(expirationTime);

        if (expirationTime <= 0) {
            logout(); // If token has expired, logout directly
            return;
        }

        // Wait for 1 minute to set the warning message
        const warningTimeout = setTimeout(() => {
            setShowWarning(true); // Show expiration warning

            // If the user doesn't do anything, close the session after another minute
            const logoutTimeout = setTimeout(() => {
                if (renewToken){
                    console.log("El token se modifico, no hay que cerrar sesión")
                    setRenewToken(false)
                }else{
                    console.log("Tu sesión ha expirado. Cerrando sesión...");
                    setShowWarning(false);
                    logout();
                }
            }, 60000);

            // Cleanup function to clear the logout timeout if the component unmounts or the token is renewed
            return () => {
                clearTimeout(logoutTimeout);
            };
        },  60000); // Directly use expirationTime - 60000
        return () => {
            clearTimeout(warningTimeout);
        };

    }, [expirationDate]); // When expirationDate token change the effect get reset to start

    return { showWarning, setShowWarning };
};

export default useTokenExpirationHook;