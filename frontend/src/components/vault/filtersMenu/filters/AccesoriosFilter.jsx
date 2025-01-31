import { useState } from 'react'

const AccesoriosFilter = ({handleFilterClick}) => {
  const filterName = 'Accesorios';
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    handleFilterClick(filterName);
  }

  const handleFilterClick = (filterName) => {
    setFilters((prevArray) => {
      // Add the filter name if not already present
      return prevArray.includes(filterName)
        ? prevArray.filter(item => item !== filterName)
        : [...prevArray, filterName];
    });
  };

  return (
    <div className={'vault-page__filters__filter'}>
      <h3>Accesorios</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
            src={'/assets/img/selectors/Accesorios-filter.svg'}
            alt={'Hat Selector'}
            className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default AccesoriosFilter