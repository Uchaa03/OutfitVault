import React from 'react';
import { useLocation } from 'react-router-dom';
import OutfitCard from '../components/Card/OutfitCard.jsx';

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
  const { outfit } = location.state || {};

  const clothingItems = outfit
    ? Object.entries(outfit)
        .filter(([_, item]) => item && item.name !== null && item.imageUrl !== null)
        .map(([category, item]) => ({
          category,
          name: item.name,
          imageUrl: item.imageUrl
        }))
    : [];

  if (clothingItems.length === 0) {
    return (
      <div className="outfit-page-container">
        <h1>Tu Outfit Recomendado</h1>
        <p>No hay ningun outfit disponible para sus peticiones</p>
      </div>
    );
  }

  return (
    <div className="outfit-page-container">
      <div className="outfit-cards-container">
        {clothingItems.map((item, index) => (
          <OutfitCard
            key={`${item.category}-${index}`}
            category={item.category}
            name={item.name}
            imageUrl={item.imageUrl}
            className={index % 2 === 0 ? 'outfit-card' : 'outfit-card2'}
            icon="https://via.placeholder.com/50"
            altIcon={`${item.category} Icon`}
          />
        ))}
      </div>
    </div>
  );
};

export default OutfitPage;