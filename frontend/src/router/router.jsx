import { createBrowserRouter } from 'react-router-dom';

import LayoutPublic from '../layouts/LayoutPublic.jsx';
import PublicRoute from '../layouts/PublicRoute.jsx';
import PrivateRoute from '../layouts/PrivateRoute.jsx';

import ArmarioSection from '../pages/HomePage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import UploadPage from '../pages/UploadPage.jsx';
import ContactPage from "../pages/ContactPage.jsx";
import PromptPage from '../pages/PromptPage.jsx';
import ProfilePage from "../pages/ProfilePage.jsx";
import VaultPage from "../pages/VaultPage.jsx";

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
    ]
  }
]);

export default router;