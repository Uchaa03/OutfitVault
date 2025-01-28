



const PantsFilter = () => {
  const handleClick = () => {
    console.log('Pants selector clicked')
    // TODO: Implement functionality to filter outfits by pants
  }

  return (
      <button onClick={handleClick()} className={'vault__filter__button'}>
        <img
            src={'/assets/img/selectors/pants.svg'}
            alt={'Pants Selector'}
            className={'vault__filter__img'}
        />
      </button>
  )
}

export default PantsFilter