import HatFilter from './filters/HatFilter.jsx';
import TorsoFilter from './filters/TorsoFilter.jsx';
import PantsFilter from './filters/PantsFilter.jsx';
import ShoesFilter from './filters/ShoesFilter.jsx';


const FiltersContainer = () => {
  return (
      <article className={'vault__filters__selection'}>
        <HatFilter />
        <TorsoFilter />
        <PantsFilter />
        <ShoesFilter />
      </article>
  )
}

export default FiltersContainer