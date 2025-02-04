import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

/**
 * PublicRoute component that restricts access to authenticated users.
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children components that will be rendered if the user is authenticated.
 * @returns {JSX.Element} The PublicRoute component.
 */
const PublicRoute = ({ children }) => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
        return <Navigate to="/" />; // Redirect to the home page if the user is authenticated
    }
    return children; // Render the children components if the user is not authenticated
};

export default PublicRoute;