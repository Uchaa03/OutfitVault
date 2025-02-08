import React from 'react';

/**
 * Superior component renders a button for selecting the "Sobretodo" category. 
 * When clicked, it triggers the `onSelect` function passed via props with the category name as the argument.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onSelect - The function to call when the button is clicked, accepting a category name.
 * @returns {JSX.Element} A button that allows the user to select the "Sobretodo" category.
 */
export const Superior = ({ onSelect }) => {

  /**
   * handleClick function is triggered when the button is clicked.
   * It calls the onSelect function with the category name "Sobretodo".
   */
  const handleClick = () => {
    onSelect("Sobretodo");
  };

  return (
    <button 
      className='superior'
      onClick={handleClick}
      tabIndex={0}  // Makes the button focusable for keyboard navigation
      role="button" // Identifies the element as a button for accessibility
      aria-label="Seleccionar categoría: Superior"  // Describes the button's action for screen readers
    >
      <h3 className='superior__text'>Superior</h3>
      <img className="superior__img" src="../../assets/img/character_superior.svg" alt="Superior" />
    </button>
  );
};
