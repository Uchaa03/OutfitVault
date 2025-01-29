import React from 'react';
import PropTypes from 'prop-types';
import ItemCardMini from '../Card/ItemCardMini.jsx';

const OutfitCard = ({ icon, altIcon, category, name, imageUrl, className }) => {
  return (
    <section className={className}>
      <div className='outfit-card__header'>
        <img className='outfit-card__icon' src={icon} alt={altIcon} />
        <h2 className='outfit-card__type'>{category}</h2>
      </div>

      <ItemCardMini name={name} itemImage={imageUrl} />
    </section>
  );
};

OutfitCard.propTypes = {
  icon: PropTypes.string.isRequired,
  altIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default OutfitCard;