import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button.jsx';
import { recommendOutfit } from '../config/Recommend-outfit.jsx';

/**
 * PromptPage Component
 *
 * This component allows the user to input a prompt (an idea for an outfit) and
 * generates a recommended outfit based on that input. The user can submit the form
 * to navigate to the outfit recommendation page.
 *
 * @component
 * @returns {JSX.Element} The rendered prompt page with the input form.
 */
const PromptPage = () => {
  const [prompt, setPrompt] = useState('');  // State to store the input value
  const [loading, setLoading] = useState(false); // Loading state for the async operation
  const navigate = useNavigate();

  /**
   * Handles the input change and updates the prompt state.
   * @param {Object} event - The event triggered by the input change.
   */
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  /**
   * Handles outfit recommendation by calling the `recommendOutfit` function.
   * Upon successful recommendation, the user is navigated to the outfit page.
   */
  const handleRecommendOutfit = async () => {
    if (!prompt.trim()) {
      console.log('Please enter a prompt');
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const recommendedOutfit = await recommendOutfit(prompt);  // Fetch recommended outfit
      console.log(recommendedOutfit);
      navigate('/outfit', { state: { outfit: recommendedOutfit } });  // Navigate to outfit page
    } catch (error) {
      console.error('Error recommending outfit:', error);
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  return (
    <section className='section__prompt'>
      <section className='prompt'>
        <h1>¿Alguna idea para hoy?</h1>
        <form
          className='prompt__field'
          aria-label="Generar Outfit"
          onSubmit={(e) => e.preventDefault()} // Prevent form default submission
        >
          <textarea
            id="idea-input"
            type="text"
            name="prompt"
            className='prompt__input'
            placeholder='Escribe aquí tu idea'
            value={prompt}
            onChange={handleInputChange}
          />
          <Button
            className='prompt__button'
            onClick={handleRecommendOutfit}
            disabled={loading}  // Disable the button while loading
          >
            {loading ? 'Generando...' : 'Generar Outfit'}
          </Button>
        </form>
      </section>
    </section>
  );
};

export default PromptPage;
