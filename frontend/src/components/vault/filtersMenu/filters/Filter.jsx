import { useState } from 'react'
import useClothesStore from '../../../../store/clothesStore.jsx'

const Filter = ({filterName}) => {
  const [isSelected, setIsSelected] = useState(false);
  const {setFilters} = useClothesStore();

  const handleFilterClick = (filterName) => {
    setFilters((prevArray) => {
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
      <h3>${filterName}</h3>
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

export default Filter