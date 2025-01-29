import {useNavigate} from 'react-router-dom';
import Button from '../../button/button.jsx';

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

  return (
    <section className="hero">
      <h2>TODA TU ROPA ORGANIZADA SIN ESFUERZO</h2>
      <Button className="hero__button" onClick={handleClick}>
        Regístrate Ahora
      </Button>
    </section>
  );
};

export default HeroSection;
