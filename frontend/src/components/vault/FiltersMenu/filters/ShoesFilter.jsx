


const ShoesFilter = ({handleArrayUpdate}) => {
  const handleClick = () => {
    console.log('Shoes selector clicked')
    // TODO: Implement functionality to filter outfits by belt
  }

  return (
      <button onClick={() => handleArrayUpdate('Zapatos')} className={'vault__filter__button'}>
        <img
            src={'/assets/img/selectors/shoes.svg'}
            alt={'Shoes Selector'}
            className={'vault__filter__img'}
        />
      </button>
  )
}

export default ShoesFilter