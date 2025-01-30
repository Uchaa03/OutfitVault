import {useEffect, useState} from 'react'
import {useUserContext} from "../context/userContext.jsx";
import {useTimeExpiration} from "../store/authStore.jsx";

const useTokenExpirationHook = () => {
    const {logout} = useUserContext()
    const [showWarning, setShowWarning] = useState(false) //For show Box of renew token or close session
    const expirationDate = useTimeExpiration()

    useEffect(() => {
        if (!expirationDate) return;

        const expirationTime = expirationDate.getTime() - Date.now()   //Get Actual time for expiration
        console.log(expirationTime)

        if (expirationTime <= 0) {
            logout() // If token has expired logout directly
        }

        //Wait for 1 min for set Warning message
        const timeout = setTimeout(() => {
            setShowWarning(true) // Show Warning of expiration
            // If user don't do it anything close session
            const logoutTimeout = setTimeout(() => {
                console.log("Tu sesión ha expirado. Cerrando sesión...")
                logout()
            }, expirationTime - 60000)

            return () => {
                clearTimeout(logoutTimeout)
                setShowWarning(false)
            }
        },  60000)

        return () => clearTimeout(timeout)

    }, [expirationDate])

    return { showWarning, setShowWarning }
}

export default useTokenExpirationHook
