

const HomeButton = () => {
  const handleClick = () => {
    console.log('Add Outfit button clicked')
    // TODO: Implement functionality to add an outfit to the vault
  }
  return (
      <section className={'header__button'} onClick={handleClick}>
        <img src={'/assets/img/home_icon.svg'}  alt={'Home Icon'} className={'button__icon'}/>
        <h2>Inicio</h2>
      </section>
  )
}

export default HomeButton