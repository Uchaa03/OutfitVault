import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';

const MainPage = () => {
  return (
    <section className="main-page">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default MainPage;