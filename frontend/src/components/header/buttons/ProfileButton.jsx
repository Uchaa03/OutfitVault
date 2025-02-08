import React from 'react'
import {NavLink} from "react-router-dom";
import {useUserContext} from "../../../context/userContext.jsx";
import {useDarkMode} from "../../../store/authStore.jsx";

/**
 * ProfileButton component that renders a button for navigating to the profile page.
 * If the user is logged in, the button will display the user's name.
 *
 * @component
 * @example
 * // Usage example:
 * <ProfileButton />
 *
 * @returns {JSX.Element} The rendered ProfileButton component with the user's name if logged in.
 */
const ProfileButton = () => {
    const { user } = useUserContext();
    const darkMode = useDarkMode();

    return (
        <NavLink to="/profile" className={darkMode ? "header__button header__button--dark" : "header__button"}>
            <img src={darkMode?
                "/assets/img/User_Icon_Dark.svg":
                "/assets/img/User_Icon_Light.svg"}
                 alt='Icono de enlace a botón de acceso al perfil de usuario y cierre de sesión en el nav'
                 className='button__icon'
            />
            <span>{user}</span> {/*Pendiente Mostrar nombre de usuario con un estado de logued*/}
        </NavLink>    )
}
export default ProfileButton
