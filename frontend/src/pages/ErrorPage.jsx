import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import Button from '../components/button/button';

/**
 * ErrorPage Component
 *
 * Renders an error page (404-like) with a button to navigate back to the home page
 * or the vault page, depending on whether the user is logged in.
 *
 * @component
 * @returns {JSX.Element} The rendered ErrorPage component.
 */
const ErrorPage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  /**
   * Handles navigation based on user authentication status.
   * If the user is logged in, navigates to the vault page.
   * Otherwise, navigates to the home page.
   */
  const handleNavigate = () => {
    if (user) {
      navigate('/vault');
    } else {
      navigate('/');
    }
  };

  return (
    <main className="error-page" role="main">
      <section className="error__container" aria-labelledby="error-title">
        <h1 id="error__title">ERROR</h1>
        <h1>4&nbsp;&nbsp;&nbsp;4</h1>
        <img 
          className="space-invader"
          src="/assets/img/space-invader.gif" 
          alt="Space Invader" 
        />
        <Button className="error__button" onClick={handleNavigate}>Volver</Button>
      </section>
    </main>
  );
};

export default ErrorPage;