import React, { useEffect } from 'react';
import useTokenExpirationHook from "../hooks/useTokenExpirationHook.jsx";
import { RouterProvider } from "react-router-dom";
import router from "../router/router.jsx";
import CardExpirationToken from "./Card/CardExpirationToken.jsx";
import ButtonDarkMode from "./button/ButtonDarkMode.jsx";
import { useDarkMode } from "../store/authStore.jsx";

/**
 * AppContent component manages the main content of the app, including theme changes, token expiration warnings, 
 * and routing. It also integrates dark mode functionality and handles the token expiration warning message.
 *
 * @returns {JSX.Element} A React component that includes routing, dark mode toggle, and token expiration warning.
 */
const AppContent = () => {
    // Custom hook to manage token expiration warning state
    const { showWarning, setShowWarning } = useTokenExpirationHook();

    // Access the dark mode state from the store
    const darkMode = useDarkMode();

    // Adding a base class to the body element for consistent styling
    document.body.classList.add('body');

    // Effect to toggle dark mode on the body class when darkMode state changes
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('body--dark'); // Apply dark mode class to body
        } else {
            document.body.classList.remove('body--dark'); // Remove dark mode class if dark mode is disabled
        }
    }, [darkMode]); // Dependency on darkMode state

    return (
        <div className="app-container">
            {/* Set up routing for the app */}
            <RouterProvider router={router} />

            {/* Display token expiration warning if the showWarning state is true */}
            {showWarning && <CardExpirationToken setShowWarning={setShowWarning} />}

            {/* Dark mode toggle button */}
            <ButtonDarkMode />
        </div>
    );
};

export default AppContent;
