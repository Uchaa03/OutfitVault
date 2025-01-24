import React from 'react'
import {NavLink} from "react-router-dom";

const VaultButton = () => {
    return (
        <NavLink to="/vault" className="header__button">
            <img src='/assets/img/IconLock.svg'  alt='Outfit Icon' className='button__icon'/>
            <span>Vault</span>
        </NavLink>    )
}
export default VaultButton
