import {createBrowserRouter} from 'react-router-dom';

import MainPage from '../pages/MainPage.jsx'
import ArmarioSection from '../layouts/HomeLayout.jsx'
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import UploadPage from '../pages/UploadPage.jsx'
import { UploadProvider } from '../context/UploadContext.jsx'
import ContactPage from "../pages/ContactPage.jsx";


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
