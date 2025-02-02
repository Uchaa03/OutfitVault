import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layouts/LayoutPublic.jsx';
import PublicRoute from '../layouts/PublicRoute.jsx';
import PrivateRoute from '../layouts/PrivateRoute.jsx';
import ArmarioSection from '../pages/HomePage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import LoadingPage from '../pages/LoadingPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import UploadPage from '../pages/UploadPage.jsx';
import PromptPage from '../pages/PromptPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import VaultPage from '../pages/VaultPage.jsx';
import OutfitPage from '../pages/OutfitPage.jsx';
import { useUserContext } from '../context/userContext.jsx';

/**
 * Component that determines whether to render the VaultPage (authenticated users)
 * or the ArmarioSection (public users) based on authentication status.
 * 
 * @returns {JSX.Element} The appropriate route based on user authentication.
 */
const HomeRoute = () => {
  const { user } = useUserContext();
  return user ? (
    <PrivateRoute>
      <VaultPage />
    </PrivateRoute>
  ) : (
    <PublicRoute>
      <ArmarioSection />
    </PublicRoute>
  );
};

/**
 * Application router configuration using React Router.
 * Defines public and private routes, handling authentication and layout.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />, // Public layout wrapping all child routes
    errorElement: <ErrorPage />, // Error page displayed in case of invalid routes
    children: [
      {
        index: true,
        element: <HomeRoute /> // Home route with conditional rendering
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        )
      },
      {
        path: 'loading',
        element: <LoadingPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'upload',
        element: (
          <PrivateRoute>
            <UploadPage />
          </PrivateRoute>
        )
      },
      {
        path: 'prompt',
        element: (
          <PrivateRoute>
            <PromptPage />
          </PrivateRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        )
      },
      {
        path: 'vault',
        element: (
          <PrivateRoute>
            <VaultPage />
          </PrivateRoute>
        )
      },
      {
        path: 'outfit',
        element: <OutfitPage />
      }
    ]
  }
]);

export default router;
