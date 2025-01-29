



const PantsFilter = ({handleArrayUpdate}) => {
  const handleClick = () => {
    console.log('Pants selector clicked')
    // TODO: Implement functionality to filter outfits by pants
  }

  return (
      <button onClick={() => handleArrayUpdate('Pantalón')} className={'vault-page__filters__filter'}>
        <img
            src={'/assets/img/selectors/pants.svg'}
            alt={'Pants Selector'}
            className={'vault__filter__img'}
        />
      </button>
  )
}

export default PantsFilter