import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button.jsx';
import { recommendOutfit } from '../config/Recommend-outfit.jsx';
import { useToken } from '../store/authStore.jsx';
import LoadingPage from './LoadingPage.jsx';
import { Helmet } from "react-helmet";
/**
 * PromptPage Component
 *
 * Allows the user to input a prompt (an idea for an outfit) and generates a recommended outfit
 * based on that input. Upon recommendation, navigates the user to the outfit page.
 *
 * @component
 * @returns {JSX.Element} The rendered PromptPage component.
 */
const PromptPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = useToken();
  const navigate = useNavigate();

  /**
   * Updates the prompt state when the input changes.
   *
   * @param {Object} event - The input change event.
   */
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  /**
   * Calls the recommendOutfit API with the prompt and navigates to the outfit page.
   */
  const handleRecommendOutfit = async () => {
    setIsLoading(true);
    try {
      const recommendedOutfit = await recommendOutfit(prompt, token);
      console.log(recommendedOutfit);
      navigate('/outfit', { state: { outfit: recommendedOutfit.outfit } });
    } catch (error) {
      console.error('Error recommending outfit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage isVisible={isLoading} onFinish={() => setIsLoading(false)} />;
  }

  return (
    <>
      <Helmet>
        <title>Genera tu Outfit - OutfitVault | Recomendaciones con IA</title>
        <meta name="description" content="Genera outfits personalizados con inteligencia artificial. Describe tu idea y obtén recomendaciones de ropa adaptadas a tu estilo." />
        <meta name="keywords" content="generador outfit, recomendación ropa, IA moda, outfit personalizado" />
        <link rel="canonical" href="https://outfitvault-1.onrender.com/prompt" />
      </Helmet>

      <section className="section__prompt">
        <section className="prompt">
          <h1>¿Alguna idea para hoy?</h1>
          <form className="prompt__field" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="idea-input" className="prompt__label visually-hidden">
              Describe tu idea para el outfit
            </label>
            <textarea
              id="idea-input"
              name="prompt"
              className="prompt__input"
              placeholder="Escribe aquí tu idea para generar un outfit"
              value={prompt}
              onChange={handleInputChange}
              aria-required="true"
              aria-describedby="prompt-description"
            />
            <span id="prompt-description" className="visually-hidden">
              Describe el tipo de outfit que te gustaría generar
            </span>
            <Button 
              className="prompt__button" 
              onClick={handleRecommendOutfit}
              aria-label="Generar outfit basado en tu descripción"
            >
              Generar Outfit
            </Button>
          </form>
        </section>
      </section>
    </>
  );
};

export default PromptPage;