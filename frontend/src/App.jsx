/**
 * @fileoverview The main application component that serves as the root component
 * for the React application. It wraps the app in context providers and sets up
 * routing using React Router.
 */

import './assets/sass/main.sass';
import { UserProvider } from './context/userContext.jsx';
import AppContent from "./components/AppContent.jsx";

/**
 * The main entry point of the application that sets up the routing and context.
 * The component wraps the entire application in the `UserProvider` to provide
 * user-related data context to all child components. It also initializes routing
 * with the `RouterProvider` component and passes the `router` object to handle
 * route management.
 *
 * @function
 * @returns {JSX.Element} The rendered application component with routing and context.
 */
function App() {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
}

export default App;
