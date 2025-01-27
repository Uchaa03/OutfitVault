import React from 'react'
import {NavLink} from "react-router-dom";
import {useUserContext} from "../../../context/userContext.jsx";

const ProfileButton = () => {
    const { user } = useUserContext();
    console.log(user)
    return (
        <NavLink to="/profile" className="header__button">
            <img src='/assets/img/login_icon.svg'  alt='Outfit Icon' className='button__icon'/>
            <span>{user}</span> {/*Pendiente Mostrar nombre de usuario con un estado de logued*/}
        </NavLink>    )
}
export default ProfileButton
