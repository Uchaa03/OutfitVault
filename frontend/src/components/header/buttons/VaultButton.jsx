import { useNavigate } from 'react-router-dom'

const VaultButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to /');
    navigate('/vault'); // Navigates to the /upload route
  };

  return (
    <section className={'header__button'} onClick={handleClick}>
      <img src={'/assets/img/vault_icon.svg'}  alt={'Vault Icon'} className={'button__icon'}/>
      <h2>Vault</h2>
    </section>
  )
}

export default VaultButton
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
