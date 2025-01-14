import { useNavigate } from 'react-router-dom';

const HeaderLogo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to /');
    navigate('/'); // Navigates to the homepage route
  };

  return (
    <button
      className="header__logo"
      onClick={handleClick}
      aria-label="Navigate to homepage" // Describes the button for screen readers
    >
      <img
        src="/assets/img/logo.svg"
        alt="Header Layout Logo"
      />
    </button>
  );
};

export default HeaderLogo;
