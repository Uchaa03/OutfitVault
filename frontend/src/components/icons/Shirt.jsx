import React from 'react';

/**
 * Shirt component renders a button for selecting the "Torso" category (Camiseta). 
 * When clicked, it triggers the `onSelect` function passed via props with the category name as the argument.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onSelect - The function to call when the button is clicked, accepting a category name.
 * @returns {JSX.Element} A button that allows the user to select the "Torso" category (Camiseta).
 */
export const Shirt = ({ onSelect }) => {

  /**
   * handleClick function is triggered when the button is clicked.
   * It calls the onSelect function with the category name "Torso" (Camiseta).
   */
  const handleClick = () => {
    onSelect("Torso");
  };

  return (
    <button 
      className='shirt'
      onClick={handleClick}
      tabIndex={0}  // Makes the button focusable for keyboard navigation
      role="button" // Identifies the element as a button for accessibility
      aria-label="Seleccionar categoría: Camiseta"  // Describes the button's action for screen readers
    >
      <h3 className='shirt__text'>Camiseta</h3>
      <img className="shirt__img" src="../../assets/img/character_shirt.svg" alt="Camiseta" />
    </button>
  );
};
