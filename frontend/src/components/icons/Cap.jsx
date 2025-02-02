import React from 'react';

/**
 * Cap component renders a button for selecting the "Accesorios" category. When clicked, it triggers the 
 * `onSelect` function passed via props with the category name as the argument.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onSelect - The function to call when the button is clicked, accepting a category name.
 * @returns {JSX.Element} A button that allows the user to select the "Accesorios" category.
 */
export const Cap = ({ onSelect }) => {

  /**
   * handleClick function is triggered when the button is clicked.
   * It calls the onSelect function with the category name "Accesorios".
   */
  const handleClick = () => {
    onSelect("Accesorios");
  };

  return (
    <button 
      className='cap'
      onClick={handleClick}
      tabIndex={0}  // Allows button to be focusable and accessible by keyboard
      role="button" // Defines the element as a button for accessibility
      aria-label="Seleccionar categoría: Accesorios"  // Descriptive label for screen readers
    >
      <p className='cap__text'>Accesorios</p>
      <img className="cap__img" src="../../assets/img/character_cap.svg" alt="Gorra" />
    </button>
  );
};
