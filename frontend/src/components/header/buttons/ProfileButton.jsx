import React from 'react'
import {NavLink} from "react-router-dom";

const ProfileButton = () => {
    return (
        <NavLink to="/profile" className="header__button">
            <img src='/assets/img/login_icon.svg'  alt='Outfit Icon' className='button__icon'/>
            <span>User</span> {/*Pendiente Mostrar nombre de usuario con un estado de logued*/}
        </NavLink>    )
}
export default ProfileButton
