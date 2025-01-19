import {createBrowserRouter} from 'react-router-dom';

import MainLayout from '../layouts/main_layout/MainLayout.jsx'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import UploadPage from '../pages/UploadPage.jsx'
import { UploadProvider } from '../contexts/UploadContext.jsx'
import ContactPage from "../pages/ContactPage.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: (<MainLayout />),
    children: [
      { index: true,
        element: <HomePage />,
      },
      { path: 'login',
        element: <LoginPage />,
      },
      { path: 'register',
        element: <RegisterPage />,
      },
      { path: 'login',
        element: <LoginPage />,
      },
      { path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'upload',
        element:
          <UploadProvider>
            <UploadPage />
          </UploadProvider>,
      }
    ]
  }
]);

export default router;
