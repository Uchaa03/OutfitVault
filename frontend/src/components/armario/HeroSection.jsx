import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleClick = () => {
    console.log("Navigating to the registration page...");
    navigate("/register"); // Redirect to the registration page
  };

  return (
    <section className="hero">
      <h1>TODA TU ROPA ORGANIZADA SIN ESFUERZO</h1>
      <button onClick={handleClick} className="button">
        Regístrate Ahora
      </button>
    </section>
  );
};

export default HeroSection;
