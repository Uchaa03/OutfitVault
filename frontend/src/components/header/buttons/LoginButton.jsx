import { NavLink } from "react-router-dom"



const LoginButton = () => {

  return (
      <NavLink to="/login" className="header__button">
        <img src={'/assets/img/login_icon.svg'}  alt={'Login Icon'} className={'button__icon'}/>
        <span>Accede</span>
      </NavLink>
  )
}

export default LoginButton