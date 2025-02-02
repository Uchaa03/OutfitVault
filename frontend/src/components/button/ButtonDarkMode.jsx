import React from 'react';
import { setUseDarkMode, useDarkMode } from "../../store/authStore.jsx";

/**
 * ButtonDarkMode component toggles between dark and light modes.
 * It changes the icon and triggers the dark mode change in the app.
 * 
 * @component
 * @example
 * <ButtonDarkMode />
 */
const ButtonDarkMode = () => {
    const darkMode = useDarkMode();
    const setDarkMode = setUseDarkMode();

    /**
     * Handles the click event to toggle dark mode.
     * It updates the dark mode state and switches the theme icon.
     */
    const handleClick = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            console.log(newMode);  // Log after state change for accurate value
            return newMode;
        });
    };

    return (
        <img
            alt="Boton de Cambio de tema oscuro/claro"
            src={darkMode ? "/assets/img/CloudySun.png" : "/assets/img/CloudyNight.png"}
            className={darkMode ? "darkmode__button darkmode__button--dark" : "darkmode__button"}
            onClick={handleClick}
        />
    );
};

export default ButtonDarkMode;
