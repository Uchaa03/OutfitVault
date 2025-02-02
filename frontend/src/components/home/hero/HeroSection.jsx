import { useNavigate } from 'react-router-dom'
import Button from '../../button/button';
import {useDarkMode} from "../../../store/authStore.jsx";


const HeroSection = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleClick = () => {
    console.log("Navigating to the registration page...");
    navigate("/register"); // Redirect to the registration page
  };

    const darkMode = useDarkMode();

    return (
    <section className={darkMode ? "hero hero--dark" : "hero"}>
      <h2>TODA TU ROPA ORGANIZADA SIN ESFUERZO</h2>
      <p>Siempre yendo bien vestido a todas partes</p>
      <Button  className={darkMode ? "hero__button hero__button--dark" : "hero__button"} onClick={handleClick}>
        Regístrate Ahora
      </Button>
    </section>
  );
};

export default HeroSection;
