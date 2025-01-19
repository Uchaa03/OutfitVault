import { NavLink } from 'react-router-dom'

const HomeButton = () => {

  return (
      <NavLink to="/" className="header__button">
        <img src={'/assets/img/home_icon.svg'}  alt={'Home Icon'} className={'button__icon'}/>
        <span>Inicio</span>
      </NavLink>
  )
}

export default HomeButton