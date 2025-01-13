import { useNavigate } from 'react-router-dom';


const AddOutfitButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to /upload');
    navigate('/upload'); // Navigates to the /upload route
  };

  return (
    <section className="header__button" onClick={handleClick}>
      <img src="/assets/img/add_icon.svg" alt="Add Icon" className="button__icon" />
      <h2>Agregar</h2>
    </section>
  );
};

export default AddOutfitButton;
