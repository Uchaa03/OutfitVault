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
    <section className="main-page" role="main" aria-label="Main application content">
      <Header />
      <section className="content" aria-label="Dynamic content section">
        <Outlet />
      </section>
      <Footer />
    </section>
  );
};

export default MainPage;