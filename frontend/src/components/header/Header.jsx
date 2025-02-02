import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import HomeButton from '../header/buttons/HomeButton.jsx';
import AddOutfitButton from '../header/buttons/AddOutfitButton.jsx';
import HeaderLogo from '../header/logo/HeaderLogo.jsx';
import OutfitsButton from '../header/buttons/OutfitsButton.jsx';
import LoginButton from '../header/buttons/LoginButton.jsx';
import ProfileButton from '../header/buttons/ProfileButton.jsx';
import VaultButton from '../header/buttons/VaultButton.jsx';
import {useDarkMode} from "../../store/authStore.jsx";

/**
 * Header component that renders the navigation bar with buttons and logo.
 * It displays different buttons depending on whether the user is logged in.
 *
 * @component
 * @example
 * // Usage example:
 * <Header />
 *
 * @returns {JSX.Element} The rendered header with navigation buttons and logo.
 */
const Header = () => {
    const { user } = useUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const darkMode = useDarkMode();

    return (
        <header className={darkMode ? "header header--dark" : "header"}>
            <div className="header__container">
                <HeaderLogo />
                <button className={darkMode ? "header__menu-button header__menu-button--dark" : "header__menu-button"} onClick={toggleMenu}>
                    Menu
                </button>
            </div>
            <ul className="header__list">
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
            {isMenuOpen && (
                <ul className="header__list header__list--mobile">
                    <li className={darkMode ? "list__item list__item--dark" : "list__item"} onClick={closeMenu}>
                        {user ? <VaultButton /> : <HomeButton />}
                    </li>
                    <li className={darkMode ? "list__item list__item--dark" : "list__item"} onClick={closeMenu}>
                        <AddOutfitButton />
                    </li>
                    <li className={darkMode ? "list__item list__item--dark" : "list__item"} onClick={closeMenu}>
                        <OutfitsButton />
                    </li>
                    <li className={darkMode ? "list__item list__item--dark" : "list__item"} onClick={closeMenu}>
                        {user ? <ProfileButton /> : <LoginButton />}
                    </li>
                </ul>
            )}
        </header>
    );
}

export default Header;