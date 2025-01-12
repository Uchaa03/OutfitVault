import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'


function App() {

  return (
    <div className={'app-container'}>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
