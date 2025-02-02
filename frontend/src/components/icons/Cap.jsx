import React from 'react'

export const Cap = ({ onSelect }) => {
  const handleClick = () => {
    onSelect("Accesorios");
  };

  return (
    <button 
      className='cap'
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label="Seleccionar categoría: Accesorios"
    >
      <p className='cap__text'>Accesorios</p>
      <img className="cap__img" src="../../assets/img/character_cap.svg" alt="Gorra" />
    </button>
  )
}