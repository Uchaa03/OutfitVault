// src/App.js
import './assets/sass/main.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';

function App() {
  return (
      <div className={'app-container'}>
        {/* React Router Setup */}
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
