import { Outlet } from 'react-router-dom';
import FooterLayout from '../layouts/FooterLayout.jsx';
import HeaderLayout from '../layouts/HeaderLayout.jsx';
import userContext from "../context/userContext.jsx";
import HeaderLoguedLayout from "../layouts/HeaderLoguedLayout.jsx";

const MainPage = () => {

    const token = userContext()
    return (
    <section className="main-page">

      {token?<HeaderLoguedLayout/>:<HeaderLayout />}
      <main className="content">
        <Outlet />
      </main>
      <FooterLayout />
    </section>
  );
};

export default MainPage;