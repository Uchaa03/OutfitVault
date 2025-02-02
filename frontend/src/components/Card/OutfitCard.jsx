import React from 'react';
import PropTypes from 'prop-types';
import ItemCardMini from '../Card/ItemCardMini.jsx';

/**
 * OutfitCard component displays an outfit with an icon, category, and a mini item card for the outfit's image.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.icon - The URL of the icon to represent the outfit category.
 * @param {string} props.altIcon - The alt text for the icon image.
 * @param {string} props.category - The category of the outfit (e.g., "Casual", "Formal").
 * @param {string} props.name - The name of the outfit item (e.g., "Red Jacket").
 * @param {string} props.imageUrl - The URL of the item image.
 * @param {string} props.className - The class name for custom styling of the outfit card.
 *
 * @returns {JSX.Element} The OutfitCard component.
 */
const OutfitCard = ({ icon, altIcon, category, name, imageUrl, className }) => {
  return (
    <section className={className}>
      <div className='outfit-card__header'>
        {/* Outfit category icon and type (category) */}
        <img className='outfit-card__icon' src={icon} alt={altIcon} />
        <h2 className='outfit-card__type'>{category}</h2>
      </div>

      {/* Mini item card displaying the outfit's name and image */}
      <ItemCardMini name={name} itemImage={imageUrl} />
    </section>
  );
};

// Prop types validation
OutfitCard.propTypes = {
  icon: PropTypes.string.isRequired,   // URL for the icon
  altIcon: PropTypes.string.isRequired,  // Alt text for the icon image
  name: PropTypes.string.isRequired,    // Name of the item (e.g., "Red Jacket")
  imageUrl: PropTypes.string.isRequired, // URL for the item's image
  className: PropTypes.string.isRequired, // Custom class name for styling
};

export default OutfitCard;
