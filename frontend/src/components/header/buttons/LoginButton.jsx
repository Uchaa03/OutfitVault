import { NavLink } from "react-router-dom";
import { useDarkMode } from "../../../store/authStore.jsx";

/**
 * The LoginButton component renders a navigation button that links to the login page.
 * It conditionally applies styles and icons based on the current dark mode state.
 *
 * @returns {JSX.Element} A navigation button linking to the login page.
 */
const LoginButton = () => {
  // Get the current dark mode state from the store
  const darkMode = useDarkMode();

  return (
    <NavLink to="/login" className={darkMode ? "header__button header__button--dark" : "header__button"}>
      {/* Conditionally render the user icon based on the dark mode state */}
      <img 
        src={darkMode ? "/assets/img/User_Icon_Dark.svg" : "/assets/img/User_Icon_Light.svg"} 
        alt={'Login Icon'} 
        className={'button__icon'}
      />
      <span>Accede</span>
    </NavLink>
  );
};

export default LoginButton;
