


const OutfitsButton = () => {
  const handleClick = () => {
    console.log('Add Outfit button clicked')
    // TODO: Implement functionality to add an outfit to the vault
  }
  return (
      <section className={'header__button'} onClick={handleClick}>
        <img src={'/assets/img/outfit_icon.svg'}  alt={'Outfit Icon'} className={'button__icon'}/>
        <h2>Outfit</h2>
      </section>
  )
}

export default OutfitsButton