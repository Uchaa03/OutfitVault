import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

/**
 * PrivateRoute component that restricts access to authenticated users.
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children components that will be rendered if the user is authenticated.
 * @returns {JSX.Element} The PrivateRoute component.
 */
const PrivateRoute = ({ children }) => {
    const { user } = useUserContext(); // Get the user state from the global context

    if (!user) {
        return <Navigate to="/login" />; // Redirect to the login page if the user is not authenticated
    }
    return children; // Render the children components if the user is authenticated
};

export default PrivateRoute;