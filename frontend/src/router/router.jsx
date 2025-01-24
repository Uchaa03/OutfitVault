import {createBrowserRouter} from 'react-router-dom';

import MainPage from '../pages/MainPage.jsx'
import ArmarioSection from '../layouts/HomeLayout.jsx'
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import UploadPage from '../pages/UploadPage.jsx'
import ContactPage from "../pages/ContactPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import OutfitPage from "../pages/OutfitPage.jsx";
import VaultPage from "../pages/VaultPage.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: (<MainPage />),
    children: [
      { index: true,
        element: <ArmarioSection />,
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
        path: 'profile',
        element:
            <ProfilePage/>
      },
      {
        path: 'outfit',
        element:
            <OutfitPage/>
      },
      {
        path: 'vault',
        element:
            <VaultPage/>
      },
    ]
  }
]);

export default router;
