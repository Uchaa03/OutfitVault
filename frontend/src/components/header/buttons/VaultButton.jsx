import React from 'react';
import { NavLink } from "react-router-dom";

/**
 * VaultButton component that renders a button for navigating to the vault page.
 *
 * @component
 * @example
 * // Usage example:
 * <VaultButton />
 *
 * @returns {JSX.Element} The rendered VaultButton component.
 */
const VaultButton = () => {
  return (
    <NavLink to="/vault" className="header__button">
      <img src='/assets/img/IconLock.svg'  alt='Vault Icon' className='button__icon'/>
      <span>Vault</span>
    </NavLink>
  );
};

export default VaultButton;
