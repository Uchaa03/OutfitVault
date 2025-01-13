import HomeButton from './buttons/HomeButton.jsx';
import AddOutfitButton from './buttons/AddOutfitButton.jsx';
import HeaderLogo from './HeaderLogo.jsx';
import OutfitsButton from './buttons/OutfitsButton.jsx';
import LoginButton from './buttons/LoginButton.jsx';

const Header = () => {
  return (
    <header className={'header'}>
      <HomeButton />
      <AddOutfitButton />
      <HeaderLogo />
      <OutfitsButton />
      <LoginButton />
    </header>
  )
}

export default Header