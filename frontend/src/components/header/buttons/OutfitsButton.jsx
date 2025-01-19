import { NavLink } from "react-router-dom"



const OutfitsButton = () => {
  return (
      <NavLink to="/" className="header__button">
        <img src={'/assets/img/outfit_icon.svg'}  alt={'Outfit Icon'} className={'button__icon'}/>
        <span>Outfit</span>
      </NavLink>
  )
}

export default OutfitsButton