import React from 'react'
import { useUserContext } from '../../context/userContext';
import HomeButton from '../header/buttons/HomeButton.jsx';
import AddOutfitButton from '../header/buttons/AddOutfitButton.jsx';
import HeaderLogo from '../header/logo/HeaderLogo.jsx';
import OutfitsButton from '../header/buttons/OutfitsButton.jsx';
import LoginButton from '../header/buttons/LoginButton.jsx';
import ProfileButton from '../header/buttons/ProfileButton.jsx';
import VaultButton from '../header/buttons/VaultButton.jsx';

const Header = () => {
    const { user } = useUserContext(); // Get the user state from the global context

    return (
      <header className="header">
        <ul className="header__list">
          <li className="list__item">
            {user ? <VaultButton /> : <HomeButton />}
          </li>
          <li className="list__item">
            <AddOutfitButton />
          </li>
          <li className="list__item">
            <HeaderLogo />
          </li>
          <li className="list__item">
            <OutfitsButton />
          </li>
          <li className="list__item">
            {user ? <ProfileButton /> : <LoginButton />}
          </li>
        </ul>
      </header>
    );
  }

export default Header