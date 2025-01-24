import HomeButton from '../components/header/buttons/HomeButton.jsx';
import AddOutfitButton from '../components/header/buttons/AddOutfitButton.jsx';
import HeaderLogo from '../components/header/logo/HeaderLogo.jsx';
import OutfitsButton from '../components/header/buttons/OutfitsButton.jsx';
import LoginButton from '../components/header/buttons/LoginButton.jsx';
import ProfileButton from "../components/header/buttons/ProfileButton.jsx";
import VaultButton from "../components/header/buttons/VaultButton.jsx";


/* We need to add user to the component to view/hide elements */
const HeaderLoguedLayout = () => {
  return (
    <header className="header">
      <ul className="header__list">
        <li className="list__item">
          <VaultButton/>
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
          <ProfileButton />
        </li>
      </ul>
    </header>
  );
}

export default HeaderLoguedLayout