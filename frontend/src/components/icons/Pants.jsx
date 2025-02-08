import React from 'react';

/**
 * Pants component renders a button for selecting the "Pantalón" category. When clicked, it triggers the 
 * `onSelect` function passed via props with the category name as the argument.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onSelect - The function to call when the button is clicked, accepting a category name.
 * @returns {JSX.Element} A button that allows the user to select the "Pantalón" category.
 */
export const Pants = ({ onSelect }) => {

  /**
   * handleClick function is triggered when the button is clicked.
   * It calls the onSelect function with the category name "Pantalón".
   */
  const handleClick = () => {
    onSelect("Pantalón");
  };

  return (
    <button 
      className='pants'
      onClick={handleClick}
      tabIndex={0}  // Makes the button focusable for keyboard navigation
      role="button" // Identifies the element as a button for accessibility
      aria-label="Seleccionar categoría: Pantalón"  // Describes the button's action for screen readers
    >
      <h3 className='pants__text'>Pantalón</h3>
      <img className="pants__img" src="../../assets/img/character_pants.svg" alt="Pantalón" />
    </button>
  );
};
