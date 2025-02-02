import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LayoutPublic from '../layouts/LayoutPublic.jsx';
import PublicRoute from '../layouts/PublicRoute.jsx';
import PrivateRoute from '../layouts/PrivateRoute.jsx';
import LoadingPage from '../pages/LoadingPage.jsx';
import { useUserContext } from '../context/userContext.jsx';

// Lazy load page components
const ArmarioSection = lazy(() => import('../pages/HomePage.jsx'));
const ErrorPage = lazy(() => import('../pages/ErrorPage.jsx'));
const LoginPage = lazy(() => import('../pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('../pages/RegisterPage.jsx'));
const ContactPage = lazy(() => import('../pages/ContactPage.jsx'));
const UploadPage = lazy(() => import('../pages/UploadPage.jsx'));
const PromptPage = lazy(() => import('../pages/PromptPage.jsx'));
const ProfilePage = lazy(() => import('../pages/ProfilePage.jsx'));
const VaultPage = lazy(() => import('../pages/VaultPage.jsx'));
const OutfitPage = lazy(() => import('../pages/OutfitPage.jsx'));

const HomeRoute = () => {
  const { user } = useUserContext();
  return user ? (
    <PrivateRoute>
      <Suspense fallback={<LoadingPage />}>
        <VaultPage />
      </Suspense>
    </PrivateRoute>
  ) : (
    <PublicRoute>
      <Suspense fallback={<LoadingPage />}>
        <ArmarioSection />
      </Suspense>
    </PublicRoute>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    errorElement: (
      <Suspense fallback={<LoadingPage />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomeRoute />
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingPage />}>
              <LoginPage />
            </Suspense>
          </PublicRoute>
        )
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingPage />}>
              <RegisterPage />
            </Suspense>
          </PublicRoute>
        )
      },
      {
        path: 'loading',
        element: <LoadingPage />
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ContactPage />
          </Suspense>
        )
      },
      {
        path: 'upload',
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingPage />}>
              <UploadPage />
            </Suspense>
          </PrivateRoute>
        )
      },
      {
        path: 'prompt',
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingPage />}>
              <PromptPage />
            </Suspense>
          </PrivateRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingPage />}>
              <ProfilePage />
            </Suspense>
          </PrivateRoute>
        )
      },
      {
        path: 'vault',
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingPage />}>
              <VaultPage />
            </Suspense>
          </PrivateRoute>
        )
      },
      {
        path: 'outfit',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <OutfitPage />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;