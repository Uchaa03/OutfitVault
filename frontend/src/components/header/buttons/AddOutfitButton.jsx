


const AddOutfitButton = () => {
  const handleClick = () => {
    console.log('Add Outfit button clicked')
    // TODO: Implement functionality to add an outfit to the vault
  }
  return (
      <section className={'header__button'} onClick={handleClick}>
        <img src={'/assets/img/add_icon.svg'}  alt={'Add Icon'} className={'button__icon'}/>
        <h2>Agregar</h2>
      </section>
  )
}

export default AddOutfitButton