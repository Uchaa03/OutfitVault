import { Outlet } from 'react-router-dom'
import FooterLayout from '../footer_layout/FooterLayout.jsx'
import HeaderLayout from '../header_layout/HeaderLayout.jsx'


const MainLayout = () => {
  return (
    <section className={'main'}>
      <HeaderLayout />
      <Outlet />
      <FooterLayout />
    </section>
  )
}

export default MainLayout