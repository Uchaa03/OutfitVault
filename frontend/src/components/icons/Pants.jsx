import React from 'react'

export const Pants = ({ onSelect }) => {
  const handleClick = () => {
    onSelect("Pantalón");
  };

  return (
    <button 
      className='pants'
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Seleccionar categoría: Pantalón"
    >
      <p className='pants__text'>Pantalón</p>
      <img className="pants__img" src="../../assets/img/character_pants.svg" alt="Pantalón" />
    </button>
  )
}