import { NavLink } from 'react-router-dom';
import { useDarkMode } from "../../../store/authStore.jsx";

/**
 * The HomeButton component renders a navigation button that directs users to the homepage.
 * It uses a conditional rendering approach to change the button's styles and icon based on 
 * the current dark mode state.
 *
 * @returns {JSX.Element} A navigation button linking to the homepage.
 */
const HomeButton = () => {
  // Get the current dark mode state from the store
  const darkMode = useDarkMode();

  return (
    <NavLink to="/" className={darkMode ? "header__button header__button--dark" : "header__button"}>
      {/* Conditionally render the home icon based on the dark mode state */}
      <img 
        src={darkMode ? "/assets/img/Home_Icon_Dark.svg" : "/assets/img/Home_Icon_Light.svg"}  
        alt={'Home Icon'} 
        className={'button__icon'}
      />
      <span>Inicio</span>
    </NavLink>
  );
};

export default HomeButton;
