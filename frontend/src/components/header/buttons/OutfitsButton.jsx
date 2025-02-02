import { NavLink } from "react-router-dom";
import { useDarkMode } from "../../../store/authStore.jsx";

/**
 * The OutfitsButton component renders a navigation button that links to the outfits page.
 * It conditionally applies styles and icons based on the current dark mode state.
 *
 * @returns {JSX.Element} A navigation button linking to the outfits page.
 */
const OutfitsButton = () => {
  // Get the current dark mode state from the store
  const darkMode = useDarkMode();

  return (
    <NavLink to="/prompt" className={darkMode ? "header__button header__button--dark" : "header__button"}>
      {/* Conditionally render the outfit icon based on the dark mode state */}
      <img 
        src={darkMode ? "/assets/img/Outfit_Icon_Dark.svg" : "/assets/img/Outfit_Icon_Light.svg"}  
        alt='Outfit Icon' 
        className='button__icon'
      />
      <span>Outfit</span>
    </NavLink>
  );
};

export default OutfitsButton;
