import {createBrowserRouter} from 'react-router-dom';

import MainPage from '../pages/MainPage.jsx'
import ArmarioSection from '../layouts/HomeLayout.jsx'
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import UploadPage from '../pages/UploadPage.jsx'
import ContactPage from "../pages/ContactPage.jsx";
import PromptPage from '../pages/PromptPage.jsx';

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
          <UploadPage />
      },
      {
        path: 'prompt',
        element:<PromptPage />
      }
    ]
  }
]);

export default router;
