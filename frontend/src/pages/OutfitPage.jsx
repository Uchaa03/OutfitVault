import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OutfitCard from '../components/Card/OutfitCard.jsx';
import Button from '../components/button/button.jsx';

/**
 * OutfitPage Component
 *
 * This component renders the OutfitPage,
 * but restricts access to authenticated users.
 * If the user is not logged in, they are redirected to the login page.
 *
 * @component
 * @returns {JSX.Element} The rendered OutfitPage component or a redirect to login.
 */
const OutfitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { outfit } = location.state || {};

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "animated");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const categoryIcons = {
    Superior: "../../assets/img/UpperIcon.svg",
    Torso: "../../assets/img/ShirtIcon.svg", 
    Pantalon: "../../assets/img/PantsIcon.svg",
    Calzado: "../../assets/img/ShoesIcon.svg",
    Accesorio: "../../assets/img/AccesoryIcon.svg"
  };

  const clothingItems = outfit
    ? Object.entries(outfit)
        .filter(([category, item]) => item && item.name && item.imageUrl)
        .map(([category, item]) => ({
          category,
          name: item.name,
          imageUrl: item.imageUrl
        }))
    : [];

  if (clothingItems.length === 0) {
    return (
      <div className="outfit-page-container">
        <p>No hay ningun outfit disponible para tu peticiones</p>
        <Button className='outfit-page__button' onClick={() => navigate('/prompt')}>
          Volver
        </Button>
      </div>
    );
  }

  const truncateName = (name) => {
    return name.length > 12 ? name.substring(0, 14) + '...' : name;
  };

  return (
    <div className="outfit-page-container">
      <div className="outfit-cards-container">
        {clothingItems.map((item, index) => {
          const isEven = index % 2 === 0;
          const cardClass = isEven ? 'outfit-card' : 'outfit-card2';
          const animationClass = isEven ? 'from-left' : 'from-right';
          return (
            <div className={`hidden ${animationClass}`} key={`${item.category}-${index}`}>
              <OutfitCard
                category={item.category}
                name={truncateName(item.name)}
                imageUrl={item.imageUrl}
                className={cardClass}
                icon={categoryIcons[item.category] || 'https://via.placeholder.com/50'}
                altIcon={`${item.category} Icon`}
              />
            </div>
          );
        })}
      </div>
      <Button 
        className='outfit-page__button'
        onClick={() => navigate('/prompt')}
      >
        ¿Otro Outfit?
      </Button>
    </div>
  );
};

export default OutfitPage;