import React, { useEffect, useRef } from 'react';
import { useUserContext } from "../../context/userContext.jsx";
import { renewToken } from "../../config/Auth.jsx";
import {useDarkMode, useSetTimeExpiration, useSetToken} from "../../store/authStore.jsx";
import Button from '../button/button.jsx';

const CardExpirationToken = ({ setShowWarning }) => {
  const { logout, login } = useUserContext();
  const storedToken = localStorage.getItem("authToken");
  const setToken = useSetToken();
  const setTimeExpiration = useSetTimeExpiration();
  const dialogRef = useRef(null);
  const darkMode = useDarkMode();

  useEffect(() => {
    // Focus management when component mounts
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
  }, []);

  const handleRenewToken = async () => {
    try {
      const response = await renewToken(storedToken);
      if (response.success) {
        localStorage.setItem("authToken", response.token);
        const newDateExpiration = new Date(localStorage.getItem("timeExpiration"));
        newDateExpiration.setHours(newDateExpiration.getHours() + 1);
        localStorage.setItem("timeExpiration", newDateExpiration.toISOString());
        setTimeExpiration(newDateExpiration);
        setToken(response.token);
        setShowWarning(false);
      } else {
        console.error('Error al renovar el token:', response.message);
      }
    } catch (error) {
      console.error('Error al renovar el token:', error.message);
    }
  };

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
          Tu sesión expira pronto
        </h1>
        <p id="session-description" className={darkMode ? "token__subtitle token__subtitle--dark" : "token__title"}>
          ¿Quieres renovar la sesión?
        </p>
        <div className='token__buttons' role="group" aria-label="Opciones de sesión">
          <Button 
            className={darkMode ? "token__button token__button--dark" : "token__button"}
            onClick={handleRenewToken}
            aria-label="Renovar sesión actual"
          >
            Renovar Sesión
          </Button>
          <Button 
            className={darkMode ? "token__button token__button--dark" : "token__button"}
            onClick={handleLogout}
            aria-label="Cerrar sesión y salir"
          >
            Cerrar Sesión
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CardExpirationToken;