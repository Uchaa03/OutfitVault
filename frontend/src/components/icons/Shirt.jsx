import React from 'react'

export const Shirt = ({ onSelect }) => {
  const handleClick = () => {
    onSelect("Torso");
  };

  return (
    <button 
      className='shirt'
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Seleccionar categoría: Camiseta"
    >
      <p className='shirt__text'>Camiseta</p>
      <img className="shirt__img" src="../../assets/img/character_shirt.svg" alt="Camiseta" />
    </button>
  )
}