import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import HomeButton from '../header/buttons/HomeButton.jsx';
import AddOutfitButton from '../header/buttons/AddOutfitButton.jsx';
import HeaderLogo from '../header/logo/HeaderLogo.jsx';
import OutfitsButton from '../header/buttons/OutfitsButton.jsx';
import LoginButton from '../header/buttons/LoginButton.jsx';
import ProfileButton from '../header/buttons/ProfileButton.jsx';
import VaultButton from '../header/buttons/VaultButton.jsx';
import Button from '../button/button.jsx';

const HeaderMobile = () => {
    const { user } = useUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header header--mobile">
            <div className="header__container">
                <HeaderLogo />
                <Button className="header__menu-button" onClick={toggleMenu}>
                    Menu
                </Button>
            </div>
            {isMenuOpen && (
                <ul className="header__list header__list--mobile">
                    <li className="list__item">
                        {user ? <VaultButton /> : <HomeButton />}
                    </li>
                    <li className="list__item">
                        <AddOutfitButton />
                    </li>
                    <li className="list__item">
                        <OutfitsButton />
                    </li>
                    <li className="list__item">
                        {user ? <ProfileButton /> : <LoginButton />}
                    </li>
                </ul>
            )}
        </header>
    );
}

export default HeaderMobile;