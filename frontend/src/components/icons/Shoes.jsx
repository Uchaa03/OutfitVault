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
      <p className="shoes__text">Calzado</p>
      <img 
        className="shoes__img" 
        src="../../assets/img/character_shoes.svg" 
        alt="Calzado" 
      />
    </button>
  );
};