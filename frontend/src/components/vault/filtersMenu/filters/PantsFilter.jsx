import { useState } from 'react'

const PantsFilter = ({filterName}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleFilterClick = (filterName) => {
    setFilters((prevArray) => {
      // Add the filter name if not already present
      return prevArray.includes(filterName)
        ? prevArray.filter(item => item !== filterName)
        : [...prevArray, filterName];
    });
  };

  const handleClick = () => {
    setIsSelected(!isSelected);
    handleFilterClick(filterName);
  }

  return (
    <div className={'vault-page__filters__filter'}>
      <h3>Pantalones</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
          src={`/assets/img/selectors/${filterName}-filter.svg`}
          alt={'Filter Selector'}
          className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default PantsFilter