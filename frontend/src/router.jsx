import {createBrowserRouter} from 'react-router-dom';

import HomePage from './pages/HomePage.jsx'
import ArmarioSection from './components/armario/HomeSection.jsx'
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UploadPage from './pages/UploadPage.jsx'
import { UploadProvider } from './contexts/UploadContext.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: (<HomePage />),
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
