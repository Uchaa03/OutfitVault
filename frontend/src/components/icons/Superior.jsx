import React from 'react'

export const Superior = ({ onSelect }) => {
  const handleClick = () => {
    onSelect("Sobretodo");
  };

  return (
    <button 
      className='superior'
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Seleccionar categoría: Superior"
    >
      <p className='superior__text'>Superior</p>
      <img className="superior__img" src="../../assets/img/character_superior.svg" alt="Superior" />
    </button>
  )
}