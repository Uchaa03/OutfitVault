import {useToken} from "../store/authStore.jsx";
import {useEffect} from "react";

const UserContext = () => {
    const token = useToken()

    useEffect(() => {
        if (token) {
            console.log("El token ha cambiado:", token);
        }
    }, [token]); //When token changes
}
export default UserContext
