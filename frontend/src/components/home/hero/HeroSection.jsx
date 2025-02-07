import { useNavigate } from 'react-router-dom'
import Button from '../../button/button';
import {useDarkMode} from "../../../store/authStore.jsx";

/**
 * HeroSection component that renders a promotional section with a heading and a registration button.
 * When the button is clicked, it navigates the user to the registration page.
 *
 * @component
 * @example
 * // Usage example:
 * <HeroSection />
 *
 * @returns {JSX.Element} The rendered hero section with heading and registration button.
 */
const HeroSection = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleClick = () => {
    console.log("Navigating to the registration page...");
    navigate("/register"); // Redirect to the registration page
  };

    const darkMode = useDarkMode();

    return (
    <section className={darkMode ? "hero hero--dark" : "hero"}>
      <h1 className="hero__title">TODA TU ROPA ORGANIZADA SIN ESFUERZO</h1>
      <h2 className={"hero__subtitle"}>Siempre yendo bien vestido a todas partes</h2>
      <Button  className={darkMode ? "hero__button hero__button--dark" : "hero__button"} onClick={handleClick}>
        Regístrate Ahora
      </Button>
    </section>
  );
};

export default HeroSection;
