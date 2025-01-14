// src/App.js
import './assets/sass/main.sass';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';


function App() {
  return (
      <div className={'app-container'}>
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
