


const AccesoriosFilter = ({handleArrayUpdate}) => {
  const handleClick = () => {
    console.log('Hat Selector clicked')
    // TODO: Implement functionality to Selector outfits by hat
  }

  return (
      <button onClick={() => handleArrayUpdate('Accesorios')} className={'vault__filter__button'}>
        <img
            src={'/assets/img/selectors/hat.svg'}
            alt={'Hat Selector'}
            className={'vault__filter__img'}
        />
      </button>
  )
}

export default AccesoriosFilter