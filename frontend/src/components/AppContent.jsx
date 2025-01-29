import React from 'react'
import useTokenExpirationHook from "../hooks/useTokenExpirationHook.jsx";
import {RouterProvider} from "react-router-dom";
import router from "../router/router.jsx";
import CardExpirationToken from "./Card/CardExpirationToken.jsx";

const AppContent = () => {

    const { showWarning } = useTokenExpirationHook()

    return (
        <div className="app-container">
            <RouterProvider router={router} />
            {showWarning && <CardExpirationToken />}
        </div>
    );
}
export default AppContent
