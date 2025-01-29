import { NavLink } from "react-router-dom";

/**
 * OutfitsButton component that renders a button to navigate to the outfits page.
 * The button includes an icon and the text "Outfit".
 *
 * @component
 * @example
 * // Usage example:
 * <OutfitsButton />
 *
 * @returns {JSX.Element} The rendered OutfitsButton component.
 */
const OutfitsButton = () => {
  return (
    <NavLink to="/prompt" className="header__button">
      <img src='/assets/img/outfit_icon.svg'  alt='Outfit Icon' className='button__icon'/>
      <span>Outfit</span>
    </NavLink>
  );
};

export default OutfitsButton;
