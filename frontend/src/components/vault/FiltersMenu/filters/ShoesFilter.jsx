import { useState } from 'react'

const ShoesFilter = ({handleArrayUpdate}) => {
  const filterName = 'Zapatos';
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    handleArrayUpdate(filterName);
  }

  return (
    <div className={'vault-page__filters__filter'}>
      <h3>Zapatos</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
          src={'/assets/img/selectors/shoes.svg'}
          alt={'Shoes Selector'}
          className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default ShoesFilter