import React from 'react'
import {NavLink} from "react-router-dom";
import {useDarkMode} from "../../../store/authStore.jsx";

const VaultButton = () => {
    const darkMode = useDarkMode();

    return (
        <NavLink to="/vault" className={darkMode ? "header__button header__button--dark" : "header__button"}>
            <img src={darkMode?
                "/assets/img/Vault_Icon_Dark.svg":
                "/assets/img/Vault_Icon_Light.svg"}  alt='Outfit Icon' className='button__icon'/>
            <span>Vault</span>
        </NavLink>    )
}
export default VaultButton
