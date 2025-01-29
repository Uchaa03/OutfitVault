import HomeButton from '../../components/header/buttons/HomeButton.jsx';
import AddOutfitButton from '../../components/header/buttons/AddOutfitButton.jsx';
import HeaderLogo from '../../components/header/logo/HeaderLogo.jsx';
import OutfitsButton from '../../components/header/buttons/OutfitsButton.jsx';
import LoginButton from '../../components/header/buttons/LoginButton.jsx';


const HeaderLayout = () => {
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

export default HeaderLayout