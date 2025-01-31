import { useState } from 'react'

const ShoesFilter = ({}) => {
  const filterName = 'Zapatos';
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
      <h3>Zapatos</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
          src={'/assets/img/selectors/Zapatos-filter.svg'}
          alt={'Shoes Selector'}
          className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default ShoesFilter