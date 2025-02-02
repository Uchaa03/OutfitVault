import AccesoriosFilter from './filters/AccesoriosFilter.jsx';
import TorsoFilter from './filters/TorsoFilter.jsx';
import PantsFilter from './filters/PantsFilter.jsx';
import ShoesFilter from './filters/ShoesFilter.jsx';
import { useEffect, useState } from 'react';

const FiltersContainer = ({ filterCloths }) => {
  const [filterArray, setFilterArray] = useState([]);

  // Whenever the filterArray is updated, filterCloths is called automatically
  useEffect(() => {
    if (filterArray.length > 0) {
      filterCloths(filterArray);
    } else {
      // Optional: Handle the case when there are no filters
      filterCloths([]);
    }
  }, [filterArray]);

  const handleFilterArray = (filterName) => {
    setFilterArray((prevArray) => {
      // We create a new array so React can efficiently track changes
      const newArray = prevArray.includes(filterName)
          ? prevArray.filter(item => item !== filterName)
          : [...prevArray, filterName]; // Add the filter name if not already present

      console.log(newArray, "Updating filter array");
      return newArray;
    });
  };

  return (
      <article className={'vault-page__filters'}>
        <AccesoriosFilter handleArrayUpdate={handleFilterArray} />
        <TorsoFilter handleArrayUpdate={handleFilterArray} />
        <PantsFilter handleArrayUpdate={handleFilterArray} />
        <ShoesFilter handleArrayUpdate={handleFilterArray} />
      </article>
  );
};

export default FiltersContainer;
