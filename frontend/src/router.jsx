import {createBrowserRouter} from 'react-router-dom';

import HomePage from './pages/HomePage.jsx'
import ArmarioSection from './components/armario/AmarioSection.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: (<HomePage />),
    children: [
      { index: true,
        path: 'armario',
        element: <ArmarioSection />,
      },
      { path: 'login',
        element: <Login />,
      },
      { path: 'register',
        element: <Register />,
      }
    ]
  }
]);

export default router;
