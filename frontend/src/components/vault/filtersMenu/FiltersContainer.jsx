import { useEffect, useState } from 'react'
import useClothesStore from '../../../store/clothesStore.jsx'
import Filter from './filters/Filter.jsx'


const FiltersContainer = ({}) => {
  const {filterCloths, filters} = useClothesStore();

  // Whenever the filterArray is updated, filterCloths is called automatically
  useEffect(() => {
    filterCloths()
  }, [filters]);

  return (
      <article className={'vault-page__filters'}>
        <Filter filterName={'Accesorios'} />
        <Filter filterName={'Torso'} />
        <Filter filterName={'Pantalón'} />
        <Filter filterName={'Zapatos'} />
      </article>
  );
};

export default FiltersContainer;
