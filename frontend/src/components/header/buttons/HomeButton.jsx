import { NavLink } from 'react-router-dom';

/**
 * HomeButton component that renders a button to navigate to the homepage.
 * The button includes an icon and the text "Inicio".
 *
 * @component
 * @example
 * // Usage example:
 * <HomeButton />
 *
 * @returns {JSX.Element} The rendered HomeButton component.
 */
const HomeButton = () => {

  return (
    <NavLink to="/" className="header__button">
      <img src={'/assets/img/home_icon.svg'}  alt={'Home Icon'} className={'button__icon'}/>
      <span>Inicio</span>
    </NavLink>
  );
};

export default HomeButton;
