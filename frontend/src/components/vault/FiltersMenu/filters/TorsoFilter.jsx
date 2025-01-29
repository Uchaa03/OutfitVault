


const TorsoFilter = ({handleArrayUpdate}) => {
  const handleClick = () => {

  }

  return (
      <button onClick={() => handleArrayUpdate('Torso')} className={'vault__filter__button'}>
        <img
            src={'/assets/img/selectors/torso.svg'}
            alt={'Torso Selector'}
            className={'vault__filter__img'}
        />
      </button>
  )
}

export default TorsoFilter