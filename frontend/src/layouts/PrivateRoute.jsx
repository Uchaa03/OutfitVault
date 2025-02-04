import { Navigate } from "react-router-dom";

/**
 * PrivateRoute component that restricts access to authenticated users.
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children components that will be rendered if the user is authenticated.
 * @returns {JSX.Element} The PrivateRoute component.
 */
const PrivateRoute = ({ children }) => {
    // Access the username stored in localStorage
    const storedUsername = localStorage.getItem('username');
    
    if (!storedUsername) {
        return <Navigate to="/login" />; // Redirect to login if no username is found
    }
    return children;
};

export default PrivateRoute;