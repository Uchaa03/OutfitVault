import HomeButton from '../components/header/buttons/HomeButton.jsx';
import AddOutfitButton from '../components/header/buttons/AddOutfitButton.jsx';
import HeaderLogo from '../components/header/logo/HeaderLogo.jsx';
import OutfitsButton from '../components/header/buttons/OutfitsButton.jsx';
import LoginButton from '../components/header/buttons/LoginButton.jsx';


/* We need to add user to the component to view/hide elements */
const HeaderLayout = () => {
  return (
    <header className="header">
      <ul className="header__list">
        <li className="list__item">
          <HomeButton />
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
          <LoginButton />
        </li>
      </ul>
    </header>
  );
}

export default HeaderLayout