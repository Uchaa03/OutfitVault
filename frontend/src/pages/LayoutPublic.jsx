import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';

/**
 * MainPage Component
 *
 * Serves as the primary layout for the application, containing:
 * - `Header`: The navigation bar and branding.
 * - `Outlet`: A placeholder for dynamically rendered components based on routing.
 * - `Footer`: The footer section of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered MainPage component.
 */
const MainPage = () => {
  return (
    <section className="main-page">
      <Header />
      <section className="content">
        <Outlet />
      </section>
      <Footer />
    </section>
  );
};

export default MainPage;
