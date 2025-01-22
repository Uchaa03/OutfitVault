import { Outlet } from 'react-router-dom';
import FooterLayout from '../layouts/FooterLayout.jsx';
import HeaderLayout from '../layouts/HeaderLayout.jsx';

const MainPage = () => {
  return (
    <section className="main-page">
      <HeaderLayout />
      <main className="content">
        <Outlet />
      </main>
      <FooterLayout />
    </section>
  );
};

export default MainPage;