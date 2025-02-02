import React from 'react';
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../../context/userContext.jsx";

/**
 * ProfileButton component that renders a button for navigating to the profile page.
 * If the user is logged in, the button will display the user's name.
 *
 * @component
 * @example
 * // Usage example:
 * <ProfileButton />
 *
 * @returns {JSX.Element} The rendered ProfileButton component with the user's name if logged in.
 */
const ProfileButton = () => {
  const { user } = useUserContext(); // Fetching user information from context

  return (
    <NavLink to="/profile" className="header__button">
      <img src='/assets/img/login_icon.svg'  alt='Outfit Icon' className='button__icon'/>
      <span>{user}</span> {/* Pending: Display logged-in user's name */}
    </NavLink>
  );
};

export default ProfileButton;
