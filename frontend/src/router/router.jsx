import RegisterPage from '../pages/RegisterPage.jsx'
import PublicRoute from '../pages/PublicRoute.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'
import LayoutPublic from '../pages/LayoutPublic.jsx'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from '../pages/PrivateRoute.jsx'
import UploadPage from '../pages/UploadPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import PromptPage from '../pages/PromptPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import VaultPage from '../pages/VaultPage.jsx'
import LoadingPage from '../pages/LoadingPage.jsx';
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
    errorElement: <ErrorPage />,
    children: [
      { index: true,
        element: <HomePage />,
      },
      { path: 'login',
        element:
          (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          )
      },
      { path: 'register',
        element:
          (
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          )
      },
      {
        path: 'loading',
        element: <LoadingPage />
      },
      { path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'upload',
        element:
          (
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          )
      },
      {
        path: 'prompt',
        element:
          (
            <PrivateRoute>
              <PromptPage />
            </PrivateRoute>
          )
      },
      {
        path: 'profile',
        element:
          (
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          )
      },
      {
        path: 'vault',
        element:
          (
            <PrivateRoute>
              <VaultPage />
            </PrivateRoute>
          )
      },
      {
        path: 'outfit',
        element:
        (
          <OutfitPage />
        )
      }
    ]
  }
]);

export default router;
