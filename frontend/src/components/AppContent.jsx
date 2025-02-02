import React from 'react';
import useTokenExpirationHook from "../hooks/useTokenExpirationHook.jsx";
import { RouterProvider } from "react-router-dom";
import router from "../router/router.jsx";
import CardExpirationToken from "./Card/CardExpirationToken.jsx";
import ButtonDarkMode from "./button/ButtonDarkMode.jsx";

const AppContent = () => {
    const { showWarning, setShowWarning } = useTokenExpirationHook();

    return (
        <div className="app-container">
            <RouterProvider router={router} />
            {showWarning && <CardExpirationToken setShowWarning={setShowWarning} />}
            <ButtonDarkMode/>
        </div>
    );
};

export default AppContent;