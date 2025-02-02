import { NavLink } from "react-router-dom"
import {useDarkMode} from "../../../store/authStore.jsx";



const LoginButton = () => {
    const darkMode = useDarkMode();

    return (
      <NavLink to="/login" className={darkMode ? "header__button header__button--dark" : "header__button"}>
        <img src={darkMode?
            "/assets/img/User_Icon_Dark.svg":
            "/assets/img/User_Icon_Light.svg"}
             alt={'Login Icon'}
             className={'button__icon'}
        />
        <span>Accede</span>
      </NavLink>
  )
}

export default LoginButton;
