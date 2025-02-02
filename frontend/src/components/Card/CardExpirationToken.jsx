import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from "../../context/userContext.jsx";
import { renewToken } from "../../config/Auth.jsx";
import { useDarkMode, useSetTimeExpiration, useSetToken } from "../../store/authStore.jsx";
import Button from '../button/button.jsx';

/**
 * CardExpirationToken component displays a warning when the user's session is about to expire.
 * It provides options to renew the session or log out.
 *
 * @component
 * @example
 * // Usage example:
 * <CardExpirationToken setShowWarning={setShowWarning} />
 *
 * @param {Object} props - The props for the CardExpirationToken component.
 * @param {function} props.setShowWarning - A function to toggle the visibility of the warning modal.
 * 
 * @returns {JSX.Element} The rendered CardExpirationToken component.
 */
const CardExpirationToken = ({ setShowWarning }) => {
  const { logout, login } = useUserContext();
  const storedToken = localStorage.getItem("authToken");
  const setToken = useSetToken();
  const setTimeExpiration = useSetTimeExpiration();
  const dialogRef = useRef(null);
  const darkMode = useDarkMode();

  useEffect(() => {
    // Focus management when the component mounts
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
  }, []);

  /**
   * Handles the token renewal by making an API call to renew the session.
   * It updates the local storage and relevant state upon success.
   */
  const handleRenewToken = async () => {
    try {
      const response = await renewToken(storedToken);
      if (response.success) {
        // Store the new token and expiration time in localStorage
        localStorage.setItem("authToken", response.token);
        const newDateExpiration = new Date(localStorage.getItem("timeExpiration"));
        newDateExpiration.setHours(newDateExpiration.getHours() + 1);
        localStorage.setItem("timeExpiration", newDateExpiration.toISOString());
        setTimeExpiration(newDateExpiration);
        setToken(response.token);
        setShowWarning(false);
      } else {
        console.error('Error renewing token:', response.message);
      }
    } catch (error) {
      console.error('Error renewing token:', error.message);
    }
  };

  /**
   * Handles logging out by calling the logout function from context
   * and hiding the warning modal.
   */
  const handleLogout = () => {
    logout();
    setShowWarning(false);
  };

  return (
    <div 
      className="token-wrapper" 
      role="dialog" 
      aria-labelledby="session-title"
      aria-describedby="session-description"
      ref={dialogRef}
      tabIndex="-1"
    >
      <main className={darkMode ? "section__token section__token--dark" : "section__token"}>
        <h1 id="session-title" className={darkMode ? "token__title token__title--dark" : "token__title"}>
          Your session is about to expire
        </h1>
        <p id="session-description" className={darkMode ? "token__subtitle token__subtitle--dark" : "token__title"}>
          Do you want to renew the session?
        </p>
        <div className='token__buttons' role="group" aria-label="Session options">
          <Button 
            className={darkMode ? "token__button token__button--dark" : "token__button"}
            onClick={handleRenewToken}
            aria-label="Renew current session"
          >
            Renew Session
          </Button>
          <Button 
            className={darkMode ? "token__button token__button--dark" : "token__button"}
            onClick={handleLogout}
            aria-label="Log out and exit"
          >
            Log Out
          </Button>
        </div>
      </main>
    </div>
  );
};

CardExpirationToken.propTypes = {
  /**
   * Function to toggle the visibility of the warning modal.
   */
  setShowWarning: PropTypes.func.isRequired,
};

export default CardExpirationToken;