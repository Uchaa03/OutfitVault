


const TorsoFilter = () => {
  const handleClick = () => {
    console.log('Torso selector clicked')
    // TODO: Implement functionality to filter outfits by belt
  }

  return (
      <button onClick={handleClick()} className={'vault__filter__button'}>
        <img
            src={'/assets/img/selectors/torso.svg'}
            alt={'Torso Selector'}
            className={'vault__filter__img'}
        />
      </button>
  )
}

export default TorsoFilter