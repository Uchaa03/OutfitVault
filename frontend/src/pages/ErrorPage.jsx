import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext'; // Fixed import path
import Button from '../components/button/button';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

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