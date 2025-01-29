import {NavLink} from 'react-router-dom';


const AddOutfitButton = () => {

  return (
    <NavLink to="/upload" className="header__button">
      <img src="/assets/img/add_icon.svg" alt="Add Icon" className="button__icon" />
      <span>Agregar</span>
    </NavLink>
  );
};

export default AddOutfitButton;
