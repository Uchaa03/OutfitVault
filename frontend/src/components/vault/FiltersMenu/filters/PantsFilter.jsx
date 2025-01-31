import { useState } from 'react'

const PantsFilter = ({handleArrayUpdate}) => {
  const filterName = 'Pantalones';
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    handleArrayUpdate(filterName);
  }

  return (
    <div className={'vault-page__filters__filter'}>
      <h3>Pantalones</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
          src={'/assets/img/selectors/pants.svg'}
          alt={'pants Selector'}
          className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default PantsFilter