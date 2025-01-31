import { useState } from 'react'

const TorsoFilter = ({handleArrayUpdate}) => {
  const filterName = 'Torso';
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    handleArrayUpdate(filterName);
  }

  return (
    <div className={'vault-page__filters__filter'}>
      <h3>Torso</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
          src={'/assets/img/selectors/torso.svg'}
          alt={'Torso Selector'}
          className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default TorsoFilter