import {useDarkMode} from "../../../store/authStore.jsx";


const HeaderLogo = () => {
  const darkMode = useDarkMode();

  return (
      <img className="header__logo" src={darkMode?
          "/assets/img/Logo_Dark.svg":
          "/assets/img/Logo_Light.svg"}
           alt="HeaderLayout Logo"
      />
  )
}

export default HeaderLogo;
