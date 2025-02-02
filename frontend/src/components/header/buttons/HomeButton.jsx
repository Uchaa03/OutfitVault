import { NavLink } from 'react-router-dom'
import {useDarkMode} from "../../../store/authStore.jsx";

const HomeButton = () => {
    const darkMode = useDarkMode();

    return (
      <NavLink to="/" className={darkMode ? "header__button header__button--dark" : "header__button"}>
        <img src={darkMode?
            "/assets/img/Home_Icon_Dark.svg":
            "/assets/img/Home_Icon_Light.svg"}  alt={'Home Icon'} className={'button__icon'}/>
        <span>Inicio</span>
      </NavLink>
  )
}

export default HomeButton;
