import {NavLink} from 'react-router-dom';

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

  return (
    <NavLink to="/upload" className="header__button">
      <img src="/assets/img/add_icon.svg" alt="Add Icon" className="button__icon" />
      <span>Agregar</span>
    </NavLink>
  );
};

export default AddOutfitButton;
