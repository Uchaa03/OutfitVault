import HomeButton from '../../components/header/buttons/HomeButton.jsx';
import AddOutfitButton from '../../components/header/buttons/AddOutfitButton.jsx';
import HeaderLogo from '../../components/header/logo/HeaderLogo.jsx';
import OutfitsButton from '../../components/header/buttons/OutfitsButton.jsx';
import LoginButton from '../../components/header/buttons/LoginButton.jsx';
import VaultButton from '../../components/header/buttons/VaultButton.jsx'


const HeaderLayout = () => {
  return (
    <header className={'header'}>
      <VaultButton />
      <AddOutfitButton />
      <HeaderLogo />
      <OutfitsButton />
      <LoginButton />
    </header>
  )
}

export default HeaderLayout