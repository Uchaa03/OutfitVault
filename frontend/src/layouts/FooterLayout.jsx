import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button.jsx';

const FooterLayout = () => {

  const navigate = useNavigate(); // React Router's navigation hook

  const handleClick = () => {
    console.log("Navigating to the contact page...");
    navigate("/contact"); // Redirect to the registration page
  };

  return (
    <section className='footer'>
      <p className='footer__terms-and-conditions'>
        Por OutfitVault ©2025 Adrián Ucha, Pablo Barrera, Maurice Darner está
        autorizado bajo CC BY-NC-ND 4.0 licencia CC BY-NC-ND 4.0
      </p>
      <Button className='footer__button' onClick={handleClick}>
        Contáctanos
      </Button>
    </section>
  )
}

export default FooterLayout