import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext.jsx";

/**
 * OutfitPage Component
 *
 * This component renders the OutfitPage,
 * but restricts access to authenticated users.
 * If the user is not logged in, they are redirected to the login page.
 *
 * @component
 * @returns {JSX.Element} The rendered OutfitPage component or a redirect to login.
 */
const OutfitPage = () => {
    const { token } = useUserContext(); // Retrieve token from user context

    // Redirect to log in if no authentication token is found
    if (!token) return <Navigate to="/login" replace />;

    return (
      <div>OutfitPage</div>
    );
};

export default OutfitPage;
