import AddOutfitButton from './buttons/AddOutfitButton.jsx'
import HeaderLogo from './logo/HeaderLogo.jsx'
import OutfitsButton from './buttons/OutfitsButton.jsx'
import ProfileButton from './buttons/ProfileButton.jsx'
import LoginButton from './buttons/LoginButton.jsx'
import HomeButton from './buttons/HomeButton.jsx'
import VaultButton from './buttons/VaultButton.jsx'

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
};

export default Header;
