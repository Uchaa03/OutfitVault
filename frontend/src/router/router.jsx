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


/**
 * Router configuration for the public and private routes in the application.
 * This router defines the paths, components, and layout for each route.
 *
 * The public routes include Login, Register, and Contact pages, while private routes such as Upload, Prompt, Profile, and Vault
 * require authentication and are wrapped with the `PrivateRoute` component.
 *
 * @module router
 * @example
 * // Usage example:
 * import router from './path/to/router';
 *
 * // This router is used to define the routing structure of the application.
 *
 * @returns {BrowserRouter} The router object that handles navigation and routing within the application.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    errorElement: <ErrorPage />, // Ahora se renderiza en el Outlet de LayoutPublic
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <ArmarioSection />
          </PublicRoute>
        )
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
