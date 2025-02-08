import { NavLink } from 'react-router-dom';
import {useDarkMode} from "../../../store/authStore.jsx";

/**
 * AddOutfitButton component that renders a button to navigate to the outfit upload page.
 * The button includes an icon and the text "Agregar".
 *
 * @component
 * @example
 * // Usage example:
 * <AddOutfitButton />
 *
 * @returns {JSX.Element} The rendered AddOutfitButton component.
 */
const AddOutfitButton = () => {
    const darkMode = useDarkMode();

  return (
    <NavLink to="/upload" className={darkMode ? "header__button header__button--dark" : "header__button"}>
      <img src={darkMode?
          "/assets/img/Add_Icon_Dark.svg":
          "/assets/img/Add_Icon_Light.svg"}
           alt="Icono de enlace a botón de acceso a la paágina de subida de una prenda en el nav"
           className="button__icon"
      />
      <span>Agregar</span>
    </NavLink>
  );
};

export default AddOutfitButton;
