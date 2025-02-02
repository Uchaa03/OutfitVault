import React from 'react'
import {NavLink} from "react-router-dom";
import {useUserContext} from "../../../context/userContext.jsx";
import {useDarkMode} from "../../../store/authStore.jsx";

const ProfileButton = () => {
    const { user } = useUserContext();
    const darkMode = useDarkMode();

    return (
        <NavLink to="/profile" className={darkMode ? "header__button header__button--dark" : "header__button"}>
            <img src={darkMode?
                "/assets/img/User_Icon_Dark.svg":
                "/assets/img/User_Icon_Light.svg"}
                 alt='Outfit Icon'
                 className='button__icon'
            />
            <span>{user}</span> {/*Pendiente Mostrar nombre de usuario con un estado de logued*/}
        </NavLink>    )
}
export default ProfileButton
