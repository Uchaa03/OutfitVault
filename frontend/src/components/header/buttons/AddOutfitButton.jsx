import { NavLink } from 'react-router-dom';
import {useDarkMode} from "../../../store/authStore.jsx";


const AddOutfitButton = () => {
    const darkMode = useDarkMode();

  return (
    <NavLink to="/upload" className={darkMode ? "header__button header__button--dark" : "header__button"}>
      <img src={darkMode?
          "/assets/img/Add_Icon_Dark.svg":
          "/assets/img/Add_Icon_Light.svg"}
           alt="Add Icon"
           className="button__icon"
      />
      <span>Agregar</span>
    </NavLink>
  );
};

export default AddOutfitButton;
