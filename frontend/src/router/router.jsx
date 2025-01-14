import {createBrowserRouter} from 'react-router-dom';

import MainPage from '../pages/MainPage.jsx'
import ArmarioSection from '../layouts/HomeLayout.jsx'
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import UploadPage from '../pages/UploadPage.jsx'
import { UploadProvider } from '../contexts/UploadContext.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: (<MainPage />),
    children: [
      { index: true,
        element: <ArmarioSection />,
      },
      { path: 'login',
        element: <LoginPage />,
      },
      { path: 'register',
        element: <RegisterPage />,
      },
      { path: 'login',
        element: <RegisterPage />,
      },
      { path: 'contact',
        element: <RegisterPage />,
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
