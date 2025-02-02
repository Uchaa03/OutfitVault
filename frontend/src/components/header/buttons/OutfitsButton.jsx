import { NavLink } from "react-router-dom"
import {useDarkMode} from "../../../store/authStore.jsx";



const OutfitsButton = () => {
    const darkMode = useDarkMode();

    return (
      <NavLink to="/prompt" className={darkMode ? "header__button header__button--dark" : "header__button"}>
        <img src={darkMode?
            "/assets/img/Outfit_Icon_Dark.svg":
            "/assets/img/Outfit_Icon_Light.svg"}  alt='Outfit Icon' className='button__icon'/>
        <span>Outfit</span>
      </NavLink>
  )
}

export default OutfitsButton;
