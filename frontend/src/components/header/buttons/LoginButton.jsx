


const LoginButton = () => {
  const handleClick = () => {
    console.log('Add Outfit button clicked')
    // TODO: Implement functionality to add an outfit to the vault
  }
  return (
      <section className={'header__button'} onClick={handleClick}>
        <img src={'/assets/img/login_icon.svg'}  alt={'Login Icon'} className={'button__icon'}/>
        <h2>Accede</h2>
      </section>
  )
}

export default LoginButton