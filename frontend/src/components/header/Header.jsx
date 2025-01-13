import HomeButton from './buttons/HomeButton.jsx';
import AddOutfitButton from './buttons/AddOutfitButton.jsx';
import HeaderLogo from './HeaderLogo.jsx';
import OutfitsButton from './buttons/OutfitsButton.jsx';
import LoginButton from './buttons/LoginButton.jsx';

const Header = () => {
  return (
    <section className={'header'}>
      <HomeButton />
      <AddOutfitButton />
      <HeaderLogo />
      <OutfitsButton />
      <LoginButton />
    </section>
  )
}

export default Header