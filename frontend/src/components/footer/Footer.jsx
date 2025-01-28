import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';

/**
 * Footer component that displays terms and conditions along with a contact button.
 * The button redirects users to the contact page when clicked.
 *
 * @component
 * @example
 * // Usage example:
 * <Footer />
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  /**
   * Handles the click event for the "Contáctanos" button and navigates to the contact page.
   *
   * @function
   * @returns {void}
   */
  const handleClick = () => {
    console.log("Navigating to the contact page...");
    navigate("/contact"); // Redirect to the contact page
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
  );
};

export default Footer;
