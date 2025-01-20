import { Outlet } from 'react-router-dom'
import FooterLayout from '../layouts/FooterLayout.jsx'
import HeaderLayout from '../layouts/HeaderLayout.jsx'


const MainPage = () => {
  return (
    <section className= 'body'>
      <HeaderLayout />
      <Outlet />
      <FooterLayout />
    </section>
  )
}

export default MainPage