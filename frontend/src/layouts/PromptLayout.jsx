import React from 'react';
import Button from '../components/button/button';

const PromptLayout = () => {
  return (
    <section className='prompt'>
      <h1>¿Alguna idea para hoy?</h1>
      <form className='prompt__field' aria-label="Generar Outfit">
        <textarea id="idea-input" type="text" name="prompt" className='prompt__input' placeholder='Escribe aquí tu idea' />
        <Button className='prompt__button'>
          Generar Outfit
        </Button>
      </form>
    </section>
  );
};

export default PromptLayout;