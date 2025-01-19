import FiltersContainer from './FiltersContainer.jsx';


const FiltersMenu = () => {
  const handleExitClick = () => {
    console.log('Exit filters')
  }

  return (
      <section className={'vault__filters'}>
        <button onClick={handleExitClick()} className={'vault__filters__exit'}>
          X
        </button>
        <h1>Selecciona que parte quieres ver</h1>
        <FiltersContainer />
      </section>
  )
}

export default FiltersMenu