import React from 'react';

export const Shoes = ({ onSelect }) => {
  const handleClick = () => {
    onSelect("Calzado");
  };

  return (
    <button 
      className="shoes"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Seleccionar categoría: Calzado"
    >
      <h3 className="shoes__text">Calzado</h3>
      <img 
        className="shoes__img" 
        src="../../assets/img/character_shoes.svg" 
        alt="Calzado" 
      />
    </button>
  );
};