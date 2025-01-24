import {useToken} from "../store/authStore.jsx";
import {useEffect, useState} from "react";

const UserContext = () => {
    const token = useToken()
    const [isAuthenticated, setisAuthenticated] = useState(false); //Change state login

    useEffect(() => {
        setisAuthenticated(!!token) //True o false if variable is null or not
    },[token]); //When token changes check token

    return isAuthenticated
}

export default UserContext

