import { useState } from 'react'

const AccesoriosFilter = ({handleArrayUpdate}) => {
  const filterName = 'Accesorios';
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    handleArrayUpdate(filterName);
  }

  return (
    <div className={'vault-page__filters__filter'}>
      <h3>Accesorios</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
            src={'/assets/img/selectors/hat.svg'}
            alt={'Hat Selector'}
            className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default AccesoriosFilter