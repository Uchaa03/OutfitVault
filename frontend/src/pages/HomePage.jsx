import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer.jsx'
import Header from '../components/header/Header.jsx'

const HomePage = () => {
  return (
    <section className={'body'}>
      <Header />
      <Outlet />
      <Footer />
    </section>
  )
}

export default HomePage