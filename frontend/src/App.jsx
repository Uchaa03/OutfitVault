import './assets/sass/main.sass';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import { UserProvider } from './context/userContext.jsx';

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
}

export default App;