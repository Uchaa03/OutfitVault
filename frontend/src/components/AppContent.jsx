import React, { useEffect } from 'react';
import useTokenExpirationHook from "../hooks/useTokenExpirationHook.jsx";
import { RouterProvider } from "react-router-dom";
import router from "../router/router.jsx";
import CardExpirationToken from "./Card/CardExpirationToken.jsx";
import ButtonDarkMode from "./button/ButtonDarkMode.jsx";
import {useDarkMode} from "../store/authStore.jsx";

const AppContent = () => {
    const { showWarning, setShowWarning } = useTokenExpirationHook();
    const darkMode = useDarkMode();
    document.body.classList.add('body');

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('body--dark'); //change body theme
        } else {
            document.body.classList.remove('body--dark');
        }
    }, [darkMode]);

    return (
        <div className="app-container">
            <RouterProvider router={router} />
            {showWarning && <CardExpirationToken setShowWarning={setShowWarning} />}
            <ButtonDarkMode/>
        </div>
    );
};

export default AppContent;
