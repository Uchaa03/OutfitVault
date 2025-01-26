import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button.jsx';
import { recommendOutfit } from '../config/Recommend-outfit.jsx';

const PromptPage = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleRecommendOutfit = async () => {
    try {
      const recommendedOutfit = await recommendOutfit(prompt);
      console.log(recommendedOutfit)
      navigate('/outfit', { state: { outfit: recommendedOutfit } });
    } catch (error) {
      console.error('Error recommending outfit:', error);
    }
  };

  return (
    <section className='section__prompt'>
        <section className='prompt'>
          <h1>¿Alguna idea para hoy?</h1>
          <form className='prompt__field' aria-label="Generar Outfit" onSubmit={(e) => e.preventDefault()}>
            <textarea
              id="idea-input"
              type="text"
              name="prompt"
              className='prompt__input'
              placeholder='Escribe aquí tu idea'
              value={prompt}
              onChange={handleInputChange}
            />
            <Button className='prompt__button' onClick={handleRecommendOutfit}>
              Generar Outfit
            </Button>
          </form>
        </section>
    </section>
  );
};

export default PromptPage;