import {createBrowserRouter} from 'react-router-dom';

import HomePage from './pages/HomePage.jsx'
import ArmarioSection from './components/armario/AmarioSection.jsx'
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';


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
      }
    ]
  }
]);

export default router;
