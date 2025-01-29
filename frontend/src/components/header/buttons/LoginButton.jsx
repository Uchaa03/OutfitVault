import { NavLink } from "react-router-dom";

/**
 * LoginButton component that renders a button to navigate to the login page.
 * The button includes an icon and the text "Accede".
 *
 * @component
 * @example
 * // Usage example:
 * <LoginButton />
 *
 * @returns {JSX.Element} The rendered LoginButton component.
 */
const LoginButton = () => {

  return (
    <NavLink to="/login" className="header__button">
      <img src={'/assets/img/login_icon.svg'}  alt={'Login Icon'} className={'button__icon'}/>
      <span>Accede</span>
    </NavLink>
  );
};

export default LoginButton;
