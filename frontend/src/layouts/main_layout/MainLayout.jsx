import { Outlet } from 'react-router-dom';
import FooterLayout from '../footer_layout/FooterLayout.jsx';
import HeaderLayout from '../header_layout/HeaderLayout.jsx';

/**
 * MainLayout component provides the overall structure of the page,
 * including the header, dynamic content through the Outlet, and footer.
 * It is used to wrap around pages that need this common layout.
 *
 * @component
 * @example
 * return (
 *   <MainLayout />
 * )
 */
const MainLayout = () => {
  return (
    <section className={'main'}>
      <HeaderLayout />
      <Outlet />
      <FooterLayout />
    </section>
  );
};

export default MainLayout;
