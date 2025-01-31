import { useState } from 'react'
import useClothesStore from '../../../../store/clothesStore.jsx'

const TorsoFilter = ({}) => {
  const filterName = 'Torso';
  const [isSelected, setIsSelected] = useState(false);
  const {setFilters} = useClothesStore();

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
      <h3>Torso</h3>
      <button
        onClick={handleClick}
        className={`vault-page__filters__selector${isSelected ? '__selected' : ''}`}
      >
        <img
          src={'/assets/img/selectors/Torso-filter.svg'}
          alt={'Torso Selector'}
          className={`vault-page__filters__img`}
        />
      </button>
    </div>
  )
}

export default TorsoFilter