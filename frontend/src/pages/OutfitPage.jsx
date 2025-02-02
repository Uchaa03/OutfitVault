import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OutfitCard from '../components/Card/OutfitCard.jsx';
import Button from '../components/button/button.jsx';

/**
 * OutfitPage Component
 *
 * Renders a collection of outfit cards with entry animations.
 * If no outfit items are available, a fallback message and a navigation button are displayed.
 *
 * @component
 * @returns {JSX.Element} The rendered OutfitPage component.
 */
const OutfitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { outfit } = location.state || {};

  useEffect(() => {
    // Instantiate an IntersectionObserver to animate elements when they enter the viewport.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "animated");
        }
      });
    });

    // Select all elements with the "hidden" class and observe each.
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    // Cleanup observer on component unmount.
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Map outfit category names to their corresponding icon image paths.
  const categoryIcons = {
    Superior: "../../assets/img/UpperIcon.svg",
    Torso: "../../assets/img/ShirtIcon.svg", 
    Pantalon: "../../assets/img/PantsIcon.svg",
    Calzado: "../../assets/img/ShoesIcon.svg",
    Accesorio: "../../assets/img/AccesoryIcon.svg",
  };

  // Construct an array of clothing items from the outfit object.
  // Only include items where both name and imageUrl are valid (not null, not empty, and not the string "null").
  const clothingItems = outfit
    ? Object.entries(outfit)
        .filter(([category, item]) => 
          item &&
          item.name != null && item.name !== "" && item.name !== "null" &&
          item.imageUrl != null && item.imageUrl !== "" && item.imageUrl !== "null"
        )
        .map(([category, item]) => ({
          category,
          name: item.name,
          imageUrl: item.imageUrl,
        }))
    : [];

  // Render a fallback view if there are no clothing items.
  if (clothingItems.length === 0) {
    return (
      <div className="outfit-page-container">
        <p>No hay ningun outfit disponible para tu peticiones</p>
        <Button className="outfit-page__button" onClick={() => navigate('/prompt')}>
          Volver
        </Button>
      </div>
    );
  }

  /**
   * Truncates a given name to a maximum length of 12 characters.
   *
   * @param {string} name - The original name string.
   * @returns {string} The truncated name appended with an ellipsis if necessary.
   */
  const truncateName = (name) => {
    return name.length > 12 ? name.substring(0, 14) + '...' : name;
  };

  return (
    <div className="outfit-page-container">
      <div className="outfit-cards-container">
        {clothingItems.map((item, index) => {
          // Alternating layout: even indexes get one style, odd indexes get another.
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
        className="outfit-page__button"
        onClick={() => navigate('/prompt')}
      >
        ¿Otro Outfit?
      </Button>
    </div>
  );
};

export default OutfitPage;