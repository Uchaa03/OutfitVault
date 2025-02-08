import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';

/**
 * Main layout component for the application.
 * It includes a header, a footer, and a dynamic content section that renders the current route.
 *
 * @returns {JSX.Element} The main page layout.
 */
const MainPage = () => {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  );
};

export default MainPage;